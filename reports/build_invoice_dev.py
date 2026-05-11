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

logo_svg = '''<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a2744"/>
      <stop offset="100%" stop-color="#2a3d5c"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <text x="32" y="27" text-anchor="middle" font-family="Georgia,serif" font-weight="bold" font-size="18" fill="#d4a843" letter-spacing="3">IKR</text>
  <line x1="14" y1="33" x2="50" y2="33" stroke="#d4a843" stroke-width="1.2" opacity="0.6"/>
  <text x="32" y="46" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" fill="rgba(255,255,255,0.75)" letter-spacing="3.5">CONSULTANCY</text>
</svg>'''

styles = '''
@page { size: A4; margin: 0; }
body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; padding: 50px 56px; font-size: 14px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 44px; border-bottom: 3px solid #1a2744; padding-bottom: 28px; }
.brand { display: flex; align-items: center; gap: 16px; }
.brand-text h1 { margin: 0; font-size: 22px; color: #1a2744; letter-spacing: 0.5px; }
.brand-text p { margin: 3px 0 0; font-size: 12px; color: #777; }
.invoice-title { text-align: right; }
.invoice-title h2 { margin: 0; font-size: 36px; color: #1a2744; letter-spacing: 3px; font-weight: 300; }
.invoice-title p { margin: 4px 0 0; font-size: 13px; color: #666; }
.meta { display: flex; justify-content: space-between; margin-bottom: 48px; }
.meta-block h3 { margin: 0 0 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #aaa; font-weight: 600; }
.meta-block p { margin: 3px 0; font-size: 13px; line-height: 1.6; }
.divider { height: 1px; background: #e0ddd6; margin: 48px 0; }
.service-box { background: #f8f7f4; border-radius: 10px; padding: 32px 36px; margin-bottom: 36px; }
.service-box h3 { margin: 0 0 8px; font-size: 17px; color: #1a2744; }
.service-box p { margin: 0; font-size: 13px; color: #777; line-height: 1.7; }
.totals { display: flex; justify-content: flex-end; margin-top: 40px; }
.totals-box { width: 300px; }
.totals-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; color: #555; }
.totals-row.total { border-top: 2px solid #1a2744; margin-top: 10px; padding-top: 16px; font-size: 22px; font-weight: 700; color: #1a2744; }
.note { margin-top: 56px; padding: 22px 28px; background: #f8f7f4; border-left: 3px solid #d4a843; border-radius: 0 8px 8px 0; font-size: 12px; color: #777; line-height: 1.7; }
.footer { margin-top: 48px; text-align: center; font-size: 11px; color: #bbb; border-top: 1px solid #eae8e3; padding-top: 18px; letter-spacing: 0.3px; }
'''

invoice_html = f'''<!DOCTYPE html><html><head><meta charset="UTF-8"><style>{styles}</style></head><body>
<div class="header">
  <div class="brand">
    {logo_svg}
    <div class="brand-text">
      <h1>IKR Consultancy</h1>
      <p>Web Design &amp; Development</p>
      <p>ABN: 61 728 427 785</p>
    </div>
  </div>
  <div class="invoice-title">
    <h2>INVOICE</h2>
    <p>INV-2026-003</p>
    <p>Date: 5 May 2026</p>
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
    <p><strong>19 May 2026</strong></p>
    <p style="margin-top: 12px; font-size: 12px; color: #aaa;">Net 14 days</p>
  </div>
</div>

<div class="service-box">
  <h3>Website Design &amp; Development</h3>
  <p>Complete custom-built website for NQ Defence Veterans Golf Club Inc. &mdash; including design, development, deployment, domain configuration, payment integration, SEO setup, and all associated tooling.</p>
  <p style="margin-top: 6px;"><strong>nqdefenceveteransgolf.com.au</strong></p>
</div>

<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>Subtotal</span><span>$2,200.00</span></div>
    <div class="totals-row"><span>GST</span><span>N/A</span></div>
    <div class="totals-row total"><span>Total Due</span><span>$2,200.00</span></div>
  </div>
</div>

<div class="note">
  <strong>Notes:</strong><br>
  Payment details to be provided. Ongoing monthly maintenance is invoiced separately.
</div>

<div class="footer">IKR Consultancy &middot; ABN 61 728 427 785 &middot; Web Design &amp; Development</div>
</body></html>'''

build_invoice(invoice_html, 'Invoice_INV-2026-003_Website_Development.pdf')
