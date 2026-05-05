import subprocess, os

def build_invoice(html, filename):
    tmp = filename.replace('.pdf', '.html')
    with open(tmp, 'w', encoding='utf-8') as f:
        f.write(html)
    edge = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    if not os.path.exists(edge):
        edge = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    subprocess.run([
        edge, '--headless', '--disable-gpu',
        f'--print-to-pdf={os.path.abspath(filename)}',
        '--no-pdf-header-footer',
        os.path.abspath(tmp)
    ], capture_output=True, timeout=30)
    os.remove(tmp)
    print(f"Created {filename}")

logo_svg = '''<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <rect width="60" height="60" rx="12" fill="#1a2744"/>
  <text x="30" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="28" fill="#d4a843">IR</text>
</svg>'''

styles = '''
body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; padding: 40px 50px; font-size: 14px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 3px solid #1a2744; padding-bottom: 24px; }
.brand { display: flex; align-items: center; gap: 14px; }
.brand-text h1 { margin: 0; font-size: 20px; color: #1a2744; }
.brand-text p { margin: 2px 0 0; font-size: 12px; color: #666; }
.invoice-title { text-align: right; }
.invoice-title h2 { margin: 0; font-size: 32px; color: #1a2744; letter-spacing: 2px; }
.invoice-title p { margin: 4px 0 0; font-size: 13px; color: #666; }
.meta { display: flex; justify-content: space-between; margin-bottom: 36px; }
.meta-block h3 { margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999; }
.meta-block p { margin: 2px 0; font-size: 13px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
thead th { background: #1a2744; color: #fff; padding: 12px 16px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
thead th:last-child { text-align: right; }
tbody td { padding: 14px 16px; border-bottom: 1px solid #e8e8e8; font-size: 13px; }
tbody td:last-child { text-align: right; font-weight: 600; }
tbody tr:nth-child(even) { background: #f9f9f9; }
.totals { display: flex; justify-content: flex-end; }
.totals-box { width: 280px; }
.totals-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
.totals-row.total { border-top: 2px solid #1a2744; margin-top: 8px; padding-top: 12px; font-size: 18px; font-weight: 700; color: #1a2744; }
.note { margin-top: 40px; padding: 20px; background: #f5f3ee; border-radius: 8px; font-size: 12px; color: #666; line-height: 1.6; }
.footer { margin-top: 40px; text-align: center; font-size: 11px; color: #aaa; border-top: 1px solid #e8e8e8; padding-top: 16px; }
'''

# --- INVOICE 1: Website Build ---
invoice1_html = f'''<!DOCTYPE html><html><head><meta charset="UTF-8"><style>{styles}</style></head><body>
<div class="header">
  <div class="brand">
    {logo_svg}
    <div class="brand-text">
      <h1>Ika Kylie Ryan</h1>
      <p>Web Design &amp; Development</p>
      <p>ABN: 61 728 427 785</p>
    </div>
  </div>
  <div class="invoice-title">
    <h2>INVOICE</h2>
    <p>INV-2026-001</p>
    <p>Date: 30 April 2026</p>
  </div>
</div>

<div class="meta">
  <div class="meta-block">
    <h3>Bill To</h3>
    <p><strong>NQ Defence Veterans Golf Club Inc.</strong></p>
    <p>16 Nineteenth Avenue</p>
    <p>Kirwan, QLD 4817</p>
    <p>nqdefenceveteransgc@gmail.com</p>
  </div>
  <div class="meta-block" style="text-align: right;">
    <h3>Payment Due</h3>
    <p><strong>14 May 2026</strong></p>
    <p style="margin-top: 12px; font-size: 12px; color: #999;">Net 14 days</p>
  </div>
</div>

<table>
  <thead><tr><th>Description</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td><strong>Custom Website Design &amp; Development</strong><br><span style="color:#666; font-size:12px;">9-page responsive website (Home, About, Events, Membership, Committee, Gallery, Sponsors, Contact, 404)</span></td><td>$800.00</td></tr>
    <tr><td><strong>Form Integration &amp; Payment Setup</strong><br><span style="color:#666; font-size:12px;">Contact form, event registration, membership application with Square online payment integration</span></td><td>$250.00</td></tr>
    <tr><td><strong>Events Management System</strong><br><span style="color:#666; font-size:12px;">Auto-hiding past events, Facebook event linking, 5-card rotation, full season calendar</span></td><td>$150.00</td></tr>
    <tr><td><strong>SEO &amp; Google Indexing</strong><br><span style="color:#666; font-size:12px;">Meta tags, sitemap, robots.txt, Google Search Console setup and verification</span></td><td>$100.00</td></tr>
    <tr><td><strong>Domain &amp; Hosting Configuration</strong><br><span style="color:#666; font-size:12px;">GitHub Pages hosting setup, custom domain (nqdefenceveteransgolf.com.au) DNS configuration, SSL</span></td><td>$100.00</td></tr>
    <tr><td><strong>Content &amp; Asset Setup</strong><br><span style="color:#666; font-size:12px;">Committee photos (cropping/resizing), sponsor logos, image optimisation, photo gallery with lightbox</span></td><td>$100.00</td></tr>
  </tbody>
</table>

<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>Subtotal</span><span>$1,500.00</span></div>
    <div class="totals-row"><span>GST</span><span>N/A</span></div>
    <div class="totals-row total"><span>Total Due</span><span>$1,500.00</span></div>
  </div>
</div>

<div class="note">
  <strong>Notes:</strong><br>
  Payment details to be provided. This invoice covers the complete design, development, and deployment of the NQ Defence Veterans Golf Club website. Ongoing monthly maintenance is invoiced separately.
</div>

<div class="footer">Ika Kylie Ryan &middot; ABN 61 728 427 785 &middot; Web Design &amp; Development</div>
</body></html>'''

# --- INVOICE 2: May Monthly ---
invoice2_html = f'''<!DOCTYPE html><html><head><meta charset="UTF-8"><style>{styles}</style></head><body>
<div class="header">
  <div class="brand">
    {logo_svg}
    <div class="brand-text">
      <h1>Ika Kylie Ryan</h1>
      <p>Web Design &amp; Development</p>
      <p>ABN: 61 728 427 785</p>
    </div>
  </div>
  <div class="invoice-title">
    <h2>INVOICE</h2>
    <p>INV-2026-002</p>
    <p>Date: 1 May 2026</p>
  </div>
</div>

<div class="meta">
  <div class="meta-block">
    <h3>Bill To</h3>
    <p><strong>NQ Defence Veterans Golf Club Inc.</strong></p>
    <p>16 Nineteenth Avenue</p>
    <p>Kirwan, QLD 4817</p>
    <p>nqdefenceveteransgc@gmail.com</p>
  </div>
  <div class="meta-block" style="text-align: right;">
    <h3>Payment Due</h3>
    <p><strong>15 May 2026</strong></p>
    <p style="margin-top: 12px; font-size: 12px; color: #999;">Net 14 days</p>
  </div>
</div>

<h3 style="font-size: 14px; color: #1a2744; margin-bottom: 16px;">Website Maintenance — May 2026</h3>

<table>
  <thead><tr><th>Description</th><th>Qty / Rate</th><th style="text-align:right;">Amount</th></tr></thead>
  <tbody>
    <tr><td><strong>Website Maintenance &amp; Updates</strong><br><span style="color:#666; font-size:12px;">Content updates, event management, sponsor changes, bug fixes, and general site upkeep</span></td><td>1.5 hrs @ $80/hr</td><td>$120.00</td></tr>
    <tr><td><strong>Development Tools (Cursor Pro)</strong><br><span style="color:#666; font-size:12px;">AI-assisted development environment subscription for website maintenance</span></td><td>Monthly</td><td>$20.00</td></tr>
    <tr><td><strong>Domain Registration</strong><br><span style="color:#666; font-size:12px;">nqdefenceveteransgolf.com.au — annual fee ($20.00) prorated monthly</span></td><td>1/12 of $20.00</td><td>$1.67</td></tr>
    <tr><td><strong>Business Registration</strong><br><span style="color:#666; font-size:12px;">ABN &amp; business name registration ($100.00) — 50% share prorated monthly</span></td><td>1/12 of $50.00</td><td>$4.17</td></tr>
  </tbody>
</table>

<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>Subtotal</span><span>$145.84</span></div>
    <div class="totals-row"><span>GST</span><span>N/A</span></div>
    <div class="totals-row total"><span>Total Due</span><span>$145.84</span></div>
  </div>
</div>

<div class="note">
  <strong>Notes:</strong><br>
  Payment details to be provided. This invoice covers monthly website maintenance and associated running costs for May 2026. Hours may vary month-to-month based on requested changes.
</div>

<div class="footer">Ika Kylie Ryan &middot; ABN 61 728 427 785 &middot; Web Design &amp; Development</div>
</body></html>'''

build_invoice(invoice1_html, 'Invoice_INV-2026-001_Website_Build.pdf')
build_invoice(invoice2_html, 'Invoice_INV-2026-002_May_2026.pdf')
