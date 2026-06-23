/*
 * Generates a static .ics file for every event card in events.html.
 * Output goes to /events/<slug>-<date>.ics so it is published by GitHub Pages
 * and served as text/calendar (the only method that reliably opens Apple
 * Calendar on iPhone — data: URIs and blobs are blocked/ignored by Safari).
 *
 * Re-run during monthly maintenance after editing events.html:
 *   node _scripts/generate-ics.js
 *
 * The slug() and filename logic here MUST stay in sync with js/main.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EVENTS_HTML = path.join(ROOT, 'events.html');
const OUT_DIR = path.join(ROOT, 'events');

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return decodeEntities(String(s).replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'event';
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function ymd(dateStr, addDays) {
  const p = dateStr.split('-');
  const d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
  if (addDays) d.setUTCDate(d.getUTCDate() + addDays);
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate());
}

function escICS(s) {
  return String(s)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function dtstamp() {
  const d = new Date();
  return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
    'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
}

const html = fs.readFileSync(EVENTS_HTML, 'utf8');

// Each segment after a split holds exactly one card's markup (the next card
// start is the split boundary), which avoids the nested-</div> problem.
const segments = html.split('<div class="ev-card');
const cards = [];
for (let i = 1; i < segments.length; i++) {
  const seg = segments[i];
  const dateMatch = seg.match(/^[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"/);
  if (!dateMatch) continue;
  cards.push({ date: dateMatch[1], block: seg });
}

if (!cards.length) {
  console.error('No event cards found — check the regex against events.html.');
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Clear out stale generated files so removed events don't linger.
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.ics')) fs.unlinkSync(path.join(OUT_DIR, f));
}

const stamp = dtstamp();
let count = 0;

for (const card of cards) {
  const titleMatch = card.block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
  const title = titleMatch ? stripTags(titleMatch[1]) : 'NQDVGC Event';

  // Description = first <p> after the </h3> that is not the disclaimer.
  let desc = '';
  const afterH3 = titleMatch ? card.block.slice(card.block.indexOf(titleMatch[0]) + titleMatch[0].length) : card.block;
  const pMatch = afterH3.match(/<p(?![^>]*class="ev-disclaimer")[^>]*>([\s\S]*?)<\/p>/);
  if (pMatch) desc = stripTags(pMatch[1]);

  // Location = first ev-meta span, stripped of icon/emoji.
  let location = 'Tropics Golf Course';
  const metaMatch = card.block.match(/<div class="ev-meta">([\s\S]*?)<\/div>/);
  if (metaMatch) {
    const spanMatch = metaMatch[1].match(/<span>([\s\S]*?)<\/span>/);
    if (spanMatch) {
      const loc = stripTags(spanMatch[1]).replace(/[^\x20-\x7E]/g, '').trim();
      if (loc) location = loc;
    }
  }

  const summary = title + ' \u2014 NQDVGC';
  const filename = slug(title) + '-' + card.date + '.ics';

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NQDVGC//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:' + escICS(summary),
    'BEGIN:VEVENT',
    'UID:' + card.date + '-' + slug(title) + '@nqdefenceveteransgolf.com.au',
    'DTSTAMP:' + stamp,
    'DTSTART;VALUE=DATE:' + ymd(card.date),
    'DTEND;VALUE=DATE:' + ymd(card.date, 1),
    'SUMMARY:' + escICS(summary),
    'LOCATION:' + escICS(location),
    'DESCRIPTION:' + escICS(desc),
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
    ''
  ].join('\r\n');

  fs.writeFileSync(path.join(OUT_DIR, filename), ics, 'utf8');
  count++;
}

console.log('Generated ' + count + ' .ics file(s) in /events/');
