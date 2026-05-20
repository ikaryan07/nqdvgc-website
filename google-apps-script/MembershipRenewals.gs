/**
 * NQDVGC Membership tracker + renewal emails
 * Setup: see docs/membership-renewal-setup.md
 */

var CONFIG = {
  CLUB_NAME: 'NQ Defence Veterans Golf Club Inc.',
  CLUB_EMAIL: 'nqdefenceveteransgc@gmail.com',
  RENEWAL_FEE: '$50',
  RENEW_URL: 'https://square.link/u/zsXy8lU7',
  WEBSITE: 'https://nqdefenceveteransgolf.com.au/membership.html',
  REMIND_DAYS_BEFORE: 14,
  SHEET_NAME: 'Members'
};

// --- Run once: create sheet, set secret, add daily trigger ---
function setup() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('WEBHOOK_SECRET')) {
    props.setProperty('WEBHOOK_SECRET', Utilities.getUuid());
  }
  getSheet_();
  createDailyTrigger_();
  Logger.log('Setup complete. WEBHOOK_SECRET: ' + props.getProperty('WEBHOOK_SECRET'));
  Logger.log('Spreadsheet URL: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}

function createDailyTrigger_() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'sendRenewalReminders') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendRenewalReminders').timeBased().everyDays(1).atHour(8).create();
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      'Join Date', 'Full Name', 'Email', 'Phone', 'Payment Method',
      'Renewal Date', 'Status', 'Welcome Sent', 'Reminder Sent'
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.secret !== PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET')) {
      return jsonResponse_({ ok: false, error: 'Unauthorized' });
    }
    if (body.action === 'register') {
      registerMember_(body);
      return jsonResponse_({ ok: true });
    }
    return jsonResponse_({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function registerMember_(data) {
  var email = (data.Email || data.email || '').toString().trim().toLowerCase();
  if (!email) throw new Error('Email required');

  var joinDate = parseDate_(data.joinDate || data['Join Date'] || new Date());
  var renewalDate = addYears_(joinDate, 1);
  var name = (data['Full Name'] || data.name || '').toString().trim();
  var phone = (data.Phone || data.phone || '').toString();
  var payment = (data['Payment Method'] || '').toString();

  var sheet = getSheet_();
  sheet.appendRow([
    formatDate_(joinDate), name, email, phone, payment,
    formatDate_(renewalDate), 'Active', 'No', ''
  ]);

  sendWelcomeEmail_(name, email, renewalDate);
  var row = sheet.getLastRow();
  sheet.getRange(row, 8).setValue('Yes');
}

function sendRenewalReminders() {
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  var today = stripTime_(new Date());
  var headers = data[0];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var status = (row[6] || '').toString();
    if (status === 'Renewed') continue;

    var email = (row[2] || '').toString().trim();
    if (!email) continue;

    var renewalDate = parseDate_(row[5]);
    if (!renewalDate) continue;

    var daysUntil = Math.round((renewalDate - today) / (1000 * 60 * 60 * 24));
    var reminderSent = (row[8] || '').toString();

    var shouldRemind =
      daysUntil <= CONFIG.REMIND_DAYS_BEFORE &&
      daysUntil >= -30 &&
      reminderSent !== formatDate_(today);

    if (!shouldRemind) continue;

    var name = (row[1] || '').toString();
    sendRenewalEmail_(name, email, renewalDate, daysUntil);
    sheet.getRange(i + 1, 9).setValue(formatDate_(today));
  }
}

function sendWelcomeEmail_(name, email, renewalDate) {
  var first = name.split(' ')[0] || 'there';
  var renewStr = formatDate_(renewalDate);
  var html = [
    '<p>Hi ' + first + ',</p>',
    '<p>Thank you for joining <strong>' + CONFIG.CLUB_NAME + '</strong>.</p>',
    '<p>Your annual membership is confirmed. Your membership will be due for renewal on <strong>' + renewStr + '</strong>.</p>',
    '<p>We will email you a reminder before your renewal date. Annual fee: ' + CONFIG.RENEWAL_FEE + '.</p>',
    '<p>When it is time to renew, you can pay online here:<br>',
    '<a href="' + CONFIG.RENEW_URL + '">Renew membership — ' + CONFIG.RENEWAL_FEE + '</a></p>',
    '<p>See you on the course!</p>',
    '<p>' + CONFIG.CLUB_NAME + '</p>'
  ].join('');

  GmailApp.sendEmail(email, 'Welcome to NQ Defence Veterans Golf Club', stripHtml_(html), {
    htmlBody: html,
    name: CONFIG.CLUB_NAME,
    replyTo: CONFIG.CLUB_EMAIL
  });
}

function sendRenewalEmail_(name, email, renewalDate, daysUntil) {
  var first = name.split(' ')[0] || 'there';
  var renewStr = formatDate_(renewalDate);
  var subject = daysUntil < 0
    ? 'Your NQDVGC membership renewal is overdue'
    : 'Time to renew your NQDVGC membership';

  var intro = daysUntil < 0
    ? 'Your annual membership renewal date was <strong>' + renewStr + '</strong>.'
    : daysUntil === 0
      ? 'Your annual membership renews <strong>today</strong>.'
      : 'Your annual membership renews on <strong>' + renewStr + '</strong> (' + daysUntil + ' days).';

  var html = [
    '<p>Hi ' + first + ',</p>',
    '<p>' + intro + '</p>',
    '<p>Please renew to stay an active member. Annual fee: ' + CONFIG.RENEWAL_FEE + '.</p>',
    '<p><a href="' + CONFIG.RENEW_URL + '"><strong>Renew now — ' + CONFIG.RENEWAL_FEE + '</strong></a></p>',
    '<p>Or visit: <a href="' + CONFIG.WEBSITE + '">' + CONFIG.WEBSITE + '</a></p>',
    '<p>If you have already renewed, please ignore this email.</p>',
    '<p>Thank you,<br>' + CONFIG.CLUB_NAME + '</p>'
  ].join('');

  GmailApp.sendEmail(email, subject, stripHtml_(html), {
    htmlBody: html,
    name: CONFIG.CLUB_NAME,
    replyTo: CONFIG.CLUB_EMAIL
  });
}

// --- Helpers ---
function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseDate_(val) {
  if (!val) return null;
  if (val instanceof Date) return stripTime_(val);
  var d = new Date(val);
  return isNaN(d.getTime()) ? null : stripTime_(d);
}

function stripTime_(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addYears_(d, years) {
  var out = new Date(d);
  out.setFullYear(out.getFullYear() + years);
  return stripTime_(out);
}

function formatDate_(d) {
  return Utilities.formatDate(d, Session.getScriptTimeZone(), 'dd MMM yyyy');
}

function stripHtml_(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
