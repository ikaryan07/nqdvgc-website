# Membership renewal emails (free setup)

This sends:
1. **Welcome email** to the member when they sign up (with their renewal date)
2. **Renewal reminder** ~2 weeks before their annual renewal date (and again if overdue)

Uses **Google Sheets + Google Apps Script** (free, runs from the club Gmail).

---

## One-time setup (about 15 minutes)

### Step 1 — Create the spreadsheet script

1. Go to [sheets.google.com](https://sheets.google.com) and sign in with **nqdefenceveteransgc@gmail.com**
2. Create a new spreadsheet named **NQDVGC Members**
3. **Extensions → Apps Script**
4. Delete any code in the editor and paste everything from `google-apps-script/MembershipRenewals.gs` in this project folder
5. Click **Save**

### Step 2 — Run setup

1. In Apps Script, select function **`setup`** from the dropdown and click **Run**
2. Allow permissions when asked (Gmail send + Spreadsheet access)
3. Open **View → Executions** or **Logs** and note:
   - **WEBHOOK_SECRET** (long code)
   - **Spreadsheet URL** (your member list)

### Step 3 — Deploy the web hook

1. **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** and copy the **Web App URL**

### Step 4 — Connect the website

1. Open `js/membership-config.js` in the website folder
2. Paste your values:

```javascript
window.NQDVGC_MEMBERSHIP = {
  sheetWebhookUrl: 'YOUR_WEB_APP_URL_HERE',
  webhookSecret: 'YOUR_WEBHOOK_SECRET_FROM_SETUP'
};
```

3. Save and push to GitHub (or ask Jai to update the live site)

---

## What happens after setup

| When | Who gets email |
|------|----------------|
| Someone submits the membership form | Club (Web3Forms) + Member (welcome email from Gmail) |
| ~14 days before renewal date | Member (renewal reminder with Square link) |
| Renewal date passed (up to 30 days) | Member (overdue reminder) |

Renewal link in emails: Square payment link on the membership page.

---

## When a member renews

In the **Members** sheet, for that person’s row:
- Set **Status** to `Renewed`
- Update **Renewal Date** to one year from the date they paid
- Clear **Reminder Sent** (leave blank)

Or add a new row if easier — just keep **Status** as `Renewed` on old rows so they don’t get duplicate reminders.

---

## Testing

1. Submit a test membership on the website (use your own email)
2. Check inbox for welcome email
3. In Apps Script, run **`sendRenewalReminders`** manually to test reminders (or temporarily change a row’s Renewal Date to within 14 days)

---

## Notes

- Emails are sent **from the Gmail account** that owns the script (club email)
- Free Google accounts have a daily sending limit (~100–500 emails) — plenty for this club
- The member list lives in your Google Sheet — only people with access to that account can see it
