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
4. Delete any code in the editor and paste everything from `_google-apps-script/MembershipRenewals.gs` in this project folder
5. Click **Save**

### Step 2 — Run setup

1. In Apps Script, select function **`setup`** from the dropdown and click **Run**
2. Allow permissions when asked (Gmail send + Spreadsheet access)
3. Open **View → Executions** or **Logs** and note:
   - **WEBHOOK_SECRET** (long code — keep this private)
   - **Spreadsheet URL** (your member list)

### Step 3 — Deploy the web hook

1. **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy** and copy the **Web App URL**

### Step 4 — Connect Web3Forms (do not put secrets in the website)

**Important:** Never paste the webhook URL or secret into website JavaScript. Anyone can read client-side code.

Instead, use the Web3Forms dashboard (server-side):

1. Log in at [web3forms.com](https://web3forms.com) with the club account
2. Open your form settings for this site
3. Enable **Webhook URL** and paste your Google Apps Script **Web App URL**
4. In the webhook payload / custom headers (if available), include the secret so Apps Script can verify requests — or add the secret only in Apps Script and validate incoming Web3Forms payloads by a shared header you configure in both places
5. Restrict submissions to **nqdefenceveteransgolf.com.au** and enable **honeypot / CAPTCHA** in Web3Forms

When a membership form is submitted, Web3Forms emails the club **and** calls your Apps Script webhook. The member welcome email is sent from Gmail without exposing secrets in the browser.

**Manual alternative:** Add each new member to the Google Sheet from the Web3Forms email notification. Renewal reminders still run automatically from the sheet.

---

## What happens after setup

| When | Who gets email |
|------|----------------|
| Someone submits the membership form | Club (Web3Forms) + Member (welcome email from Gmail, if webhook connected) |
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
- Internal setup files live in `_docs/` and `_google-apps-script/` — these folders are not published to the public website
