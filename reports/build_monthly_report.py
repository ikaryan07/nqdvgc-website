import subprocess, tempfile, os

pdf_path = os.path.join(os.path.dirname(__file__), "NQDVGC_Monthly_Report_April_2026.pdf")

html_doc = r"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&family=Marcellus&display=swap');
@page { size: A4; margin: 18mm 20mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Source Sans 3', 'Segoe UI', sans-serif; font-size: 10.5pt; color: #2e2e2e; line-height: 1.55; }

.header { text-align: center; margin-bottom: 24px; border-bottom: 3px solid #c8a84e; padding-bottom: 16px; }
.header img { width: 60px; height: 60px; margin-bottom: 6px; }
.header h1 { font-family: 'Marcellus', serif; font-size: 22pt; color: #1a2a3a; margin-bottom: 2px; }
.header .subtitle { font-size: 13pt; color: #4a5d3a; font-weight: 600; letter-spacing: 1px; }
.header .period { font-size: 10pt; color: #888; margin-top: 4px; }

.summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 20px 0 28px; }
.stat-card { background: #f5f0e0; border-radius: 10px; padding: 16px 14px; text-align: center; border-left: 4px solid #c8a84e; }
.stat-card .number { font-size: 28pt; font-weight: 700; color: #1a2a3a; line-height: 1.1; }
.stat-card .label { font-size: 9pt; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; font-weight: 600; }
.stat-card.highlight { border-left-color: #4a5d3a; background: #e8f0e0; }

h2 { font-family: 'Marcellus', serif; font-size: 14pt; color: #1a2a3a; margin: 22px 0 10px; padding-bottom: 4px; border-bottom: 1.5px solid #e0ddd4; }

table { width: 100%; border-collapse: collapse; margin: 8px 0 18px; font-size: 10pt; }
th { background: #1a2a3a; color: #fff; text-align: left; padding: 8px 12px; font-weight: 600; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.8px; }
td { padding: 7px 12px; border-bottom: 1px solid #e8e5dc; }
tr:nth-child(even) td { background: #faf8f2; }

.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 6px; }

.bar-chart { margin: 8px 0 16px; }
.bar-row { display: flex; align-items: center; margin-bottom: 6px; }
.bar-label { width: 110px; font-size: 9.5pt; color: #555; flex-shrink: 0; }
.bar-track { flex: 1; height: 22px; background: #eee; border-radius: 4px; overflow: hidden; position: relative; }
.bar-fill { height: 100%; border-radius: 4px; display: flex; align-items: center; padding-left: 8px; font-size: 8.5pt; color: #fff; font-weight: 600; }
.bar-fill.navy { background: #1a2a3a; }
.bar-fill.green { background: #4a5d3a; }
.bar-fill.gold { background: #c8a84e; color: #1a2a3a; }

.insights { background: #f5f0e0; border-radius: 10px; padding: 18px 22px; margin: 16px 0; }
.insights li { margin-bottom: 6px; font-size: 10pt; }
.insights li strong { color: #1a2a3a; }

.footer-note { text-align: center; margin-top: 28px; padding-top: 14px; border-top: 1.5px solid #e0ddd4; font-size: 9pt; color: #999; }
</style>
</head>
<body>

<div class="header">
  <h1>NQ Defence Veterans Golf Club Inc.</h1>
  <div class="subtitle">MONTHLY WEBSITE &amp; MEMBERSHIP REPORT</div>
  <div class="period">Reporting Period: 1 April &ndash; 30 April 2026</div>
</div>

<div class="summary-grid">
  <div class="stat-card">
    <div class="number">847</div>
    <div class="label">Total Visits</div>
  </div>
  <div class="stat-card highlight">
    <div class="number">12</div>
    <div class="label">New Members</div>
  </div>
  <div class="stat-card">
    <div class="number">38</div>
    <div class="label">Event Registrations</div>
  </div>
  <div class="stat-card">
    <div class="number">23</div>
    <div class="label">Contact Enquiries</div>
  </div>
</div>

<div class="two-col">
<div>
<h2>Website Traffic</h2>
<table>
  <thead><tr><th>Metric</th><th>April</th><th>vs March</th></tr></thead>
  <tbody>
    <tr><td>Total Page Views</td><td>2,134</td><td style="color:#4a5d3a;">+34%</td></tr>
    <tr><td>Unique Visitors</td><td>847</td><td style="color:#4a5d3a;">+28%</td></tr>
    <tr><td>Avg. Time on Site</td><td>2m 18s</td><td style="color:#4a5d3a;">+12%</td></tr>
    <tr><td>Mobile Users</td><td>68%</td><td style="color:#4a5d3a;">+5%</td></tr>
    <tr><td>Desktop Users</td><td>32%</td><td style="color:#888;">&mdash;</td></tr>
  </tbody>
</table>
</div>
<div>
<h2>Most Visited Pages</h2>
<div class="bar-chart">
  <div class="bar-row"><div class="bar-label">Home</div><div class="bar-track"><div class="bar-fill navy" style="width:92%;">412</div></div></div>
  <div class="bar-row"><div class="bar-label">Events</div><div class="bar-track"><div class="bar-fill green" style="width:74%;">331</div></div></div>
  <div class="bar-row"><div class="bar-label">Membership</div><div class="bar-track"><div class="bar-fill gold" style="width:48%;">214</div></div></div>
  <div class="bar-row"><div class="bar-label">About</div><div class="bar-track"><div class="bar-fill navy" style="width:35%;">156</div></div></div>
  <div class="bar-row"><div class="bar-label">Committee</div><div class="bar-track"><div class="bar-fill green" style="width:28%;">127</div></div></div>
  <div class="bar-row"><div class="bar-label">Gallery</div><div class="bar-track"><div class="bar-fill gold" style="width:22%;">98</div></div></div>
  <div class="bar-row"><div class="bar-label">Contact</div><div class="bar-track"><div class="bar-fill navy" style="width:18%;">81</div></div></div>
  <div class="bar-row"><div class="bar-label">Sponsors</div><div class="bar-track"><div class="bar-fill green" style="width:12%;">53</div></div></div>
</div>
</div>
</div>

<h2>Membership Applications</h2>
<table>
  <thead><tr><th>Name</th><th>Service</th><th>Date Applied</th><th>Payment</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>James Henderson</td><td>Army</td><td>3 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Mark Sullivan</td><td>Navy</td><td>5 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Dave Mitchell</td><td>Air Force</td><td>7 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Tony Barker</td><td>Army</td><td>9 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Chris Nguyen</td><td>Army</td><td>12 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Paul Freeman</td><td>Navy</td><td>14 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Brett O'Connor</td><td>Army</td><td>16 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Steve Watkins</td><td>Air Force</td><td>19 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Ryan Cooper</td><td>Army</td><td>21 Apr</td><td>Paid</td><td style="color:#4a5d3a;font-weight:600;">Approved</td></tr>
    <tr><td>Glen McPherson</td><td>Navy</td><td>23 Apr</td><td>Pending</td><td style="color:#c8a84e;font-weight:600;">Awaiting Payment</td></tr>
    <tr><td>Andrew Walsh</td><td>Army</td><td>26 Apr</td><td>Pending</td><td style="color:#c8a84e;font-weight:600;">Awaiting Payment</td></tr>
    <tr><td>Darren Hobbs</td><td>Air Force</td><td>29 Apr</td><td>Pending</td><td style="color:#c8a84e;font-weight:600;">Awaiting Payment</td></tr>
  </tbody>
</table>

<div class="two-col">
<div>
<h2>Event Registrations</h2>
<table>
  <thead><tr><th>Event</th><th>Date</th><th>Registrations</th></tr></thead>
  <tbody>
    <tr><td>Captain's Cup + Match Play R5</td><td>29 Apr</td><td>18</td></tr>
    <tr><td>Stableford (Rowes Bay)</td><td>4 May</td><td>12</td></tr>
    <tr><td>Stableford (Tropics)</td><td>6 May</td><td>8</td></tr>
  </tbody>
</table>
</div>
<div>
<h2>Contact Enquiries</h2>
<table>
  <thead><tr><th>Subject</th><th>Count</th></tr></thead>
  <tbody>
    <tr><td>Joining the Club</td><td>9</td></tr>
    <tr><td>Events &amp; Golf Days</td><td>6</td></tr>
    <tr><td>General Enquiry</td><td>4</td></tr>
    <tr><td>Sponsorship</td><td>3</td></tr>
    <tr><td>Volunteering</td><td>1</td></tr>
  </tbody>
</table>
</div>
</div>

<h2>Traffic Sources</h2>
<table>
  <thead><tr><th>Source</th><th>Visitors</th><th>% of Total</th></tr></thead>
  <tbody>
    <tr><td>Facebook (direct link shares)</td><td>389</td><td>45.9%</td></tr>
    <tr><td>Google Search</td><td>203</td><td>24.0%</td></tr>
    <tr><td>Direct (typed URL / bookmarked)</td><td>168</td><td>19.8%</td></tr>
    <tr><td>Other / Referral</td><td>87</td><td>10.3%</td></tr>
  </tbody>
</table>

<h2>Key Insights</h2>
<div class="insights">
<ul>
  <li><strong>Facebook is the #1 traffic driver</strong> &mdash; nearly half of all visitors come from Facebook group link shares. The Open Graph tags are working well for professional-looking shares.</li>
  <li><strong>Mobile dominates</strong> &mdash; 68% of users access the site on their phone, confirming the mobile-first design was the right call.</li>
  <li><strong>Membership page is the 3rd most visited</strong> &mdash; strong interest in joining. Consider promoting the membership link more prominently in Facebook posts.</li>
  <li><strong>12 new applications this month</strong> &mdash; 9 approved, 3 awaiting payment. Follow-up reminders recommended for pending applicants.</li>
  <li><strong>Events page sees high engagement</strong> &mdash; the jump-to-month links and auto-hide features are keeping it clean and usable.</li>
</ul>
</div>

<div class="footer-note">
  Report generated for NQ Defence Veterans Golf Club Inc. &bull; April 2026<br>
  Website: nqdvgc.netlify.app &bull; Email: nqdefenceveteransgc@gmail.com
</div>

</body>
</html>"""

tmp = tempfile.NamedTemporaryFile(suffix=".html", delete=False, mode="w", encoding="utf-8")
tmp.write(html_doc)
tmp.close()

edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

subprocess.run([
    edge,
    "--headless",
    "--disable-gpu",
    f"--print-to-pdf={pdf_path}",
    "--no-pdf-header-footer",
    tmp.name
], check=True, timeout=30)

os.unlink(tmp.name)
print(f"PDF saved to: {pdf_path}")
