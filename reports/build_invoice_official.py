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

logo_svg = '''<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1b1b2f"/>
      <stop offset="100%" stop-color="#252540"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#48c6a8"/>
      <stop offset="100%" stop-color="#2fa88e"/>
    </linearGradient>
  </defs>
  <rect width="72" height="72" rx="16" fill="url(#bg)"/>
  <text x="36" y="40" text-anchor="middle" font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-weight="800" font-size="30" fill="url(#accent)" letter-spacing="5">IKR</text>
  <text x="36" y="55" text-anchor="middle" font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="7" fill="rgba(255,255,255,0.55)" letter-spacing="1.5" font-weight="400">CONSULTANCY</text>
</svg>'''

styles = '''
@page { size: A4; margin: 0; }
body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; margin: 0; padding: 0; font-size: 14px; }
.top-bar { height: 6px; background: linear-gradient(90deg, #1b1b2f, #252540 40%, #48c6a8 60%, #2fa88e); }
.content { padding: 48px 56px 40px; }
.header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; }
.brand { display: flex; align-items: center; gap: 18px; }
.brand-text h1 { margin: 0; font-size: 24px; color: #1b1b2f; font-weight: 700; letter-spacing: 1px; }
.brand-text .tagline { margin: 4px 0 0; font-size: 11px; color: #999; letter-spacing: 2px; text-transform: uppercase; font-weight: 400; }
.brand-text .abn { margin: 3px 0 0; font-size: 12px; color: #888; }
.invoice-badge { text-align: right; }
.invoice-badge h2 { margin: 0; font-size: 42px; color: #1b1b2f; letter-spacing: 4px; font-weight: 200; }
.invoice-badge .inv-num { font-size: 15px; color: #2fa88e; font-weight: 600; margin-top: 4px; }
.invoice-badge .inv-date { font-size: 13px; color: #888; margin-top: 4px; }
.divider { height: 2px; background: linear-gradient(90deg, #1b1b2f, #48c6a8, transparent); margin-bottom: 40px; }
.meta { display: flex; justify-content: space-between; margin-bottom: 44px; }
.meta-block h3 { margin: 0 0 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #bbb; font-weight: 600; }
.meta-block p { margin: 3px 0; font-size: 13px; line-height: 1.7; color: #444; }
.service-box { background: linear-gradient(135deg, #f9f8f5, #f3f1ec); border-radius: 12px; padding: 34px 38px; margin-bottom: 12px; border: 1px solid #eae7df; }
.service-box h3 { margin: 0 0 10px; font-size: 18px; color: #1b1b2f; font-weight: 600; }
.service-box p { margin: 0; font-size: 13px; color: #777; line-height: 1.8; }
.service-box .site-url { margin-top: 10px; font-size: 13px; font-weight: 600; color: #1b1b2f; }
.totals { display: flex; justify-content: flex-end; margin-top: 36px; }
.totals-box { width: 300px; }
.totals-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; color: #666; }
.totals-row.total { border-top: 3px solid #1b1b2f; margin-top: 10px; padding-top: 16px; font-size: 24px; font-weight: 700; color: #1b1b2f; }
.payment-box { margin-top: 44px; display: flex; gap: 0; border-radius: 12px; overflow: hidden; border: 1px solid #eae7df; }
.payment-label { background: #1b1b2f; color: #48c6a8; padding: 24px 28px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; display: flex; align-items: center; min-width: 120px; }
.payment-details { background: #f9f8f5; padding: 20px 28px; flex: 1; display: flex; gap: 40px; }
.payment-details .pay-item { font-size: 12px; color: #888; line-height: 1.3; }
.payment-details .pay-item span { display: block; font-size: 14px; color: #222; font-weight: 600; margin-top: 4px; }
.note { margin-top: 36px; font-size: 11px; color: #aaa; line-height: 1.7; text-align: center; }
.footer { margin-top: 40px; text-align: center; font-size: 10px; color: #ccc; border-top: 1px solid #eee; padding-top: 16px; letter-spacing: 1px; text-transform: uppercase; }
'''

invoice_html = f'''<!DOCTYPE html><html><head><meta charset="UTF-8"><style>{styles}</style></head><body>
<div class="top-bar"></div>
<div class="content">

<div class="header">
  <div class="brand">
    {logo_svg}
    <div class="brand-text">
      <h1>IKR Consultancy</h1>
      <p class="tagline">Web Design &amp; Development</p>
      <p class="abn">ABN: 61 728 427 785</p>
    </div>
  </div>
  <div class="invoice-badge">
    <h2>INVOICE</h2>
    <p class="inv-num">INV-001</p>
    <p class="inv-date">17 May 2026</p>
  </div>
</div>

<div class="divider"></div>

<div class="meta">
  <div class="meta-block">
    <h3>Bill To</h3>
    <p><strong>NQ Defence Veterans Golf Club Inc.</strong></p>
    <p>16 Nineteenth Avenue</p>
    <p>Kirwan, QLD 4817</p>
    <p>nqdefenceveteransgc@gmail.com</p>
  </div>
  <div class="meta-block" style="text-align: right;">
    <h3>Due Date</h3>
    <p style="font-size: 18px; font-weight: 700; color: #1b1b2f;">31 May 2026</p>
    <p style="margin-top: 8px; font-size: 11px; color: #bbb;">Net 14 days</p>
  </div>
</div>

<div class="service-box">
  <h3>Website Design &amp; Development</h3>
  <p>Complete custom-built website for NQ Defence Veterans Golf Club Inc. &mdash; including design, development, deployment, domain configuration, payment integration, SEO setup, analytics, and all associated tooling.</p>
  <p class="site-url">nqdefenceveteransgolf.com.au</p>
</div>

<div class="totals">
  <div class="totals-box">
    <div class="totals-row"><span>Subtotal</span><span>$850.00</span></div>
    <div class="totals-row"><span>GST</span><span>N/A</span></div>
    <div class="totals-row total"><span>Total Due</span><span>$850.00</span></div>
  </div>
</div>

<div class="payment-box">
  <div class="payment-label">Payment<br>Details</div>
  <div class="payment-details">
    <div class="pay-item">Account Name<span>IKR Consultancy</span></div>
    <div class="pay-item">BSB<span>084-961</span></div>
    <div class="pay-item">Account No.<span>779360658</span></div>
    <div class="pay-item">Reference<span>INV-001</span></div>
  </div>
</div>

<p class="note">Ongoing monthly maintenance will be invoiced separately. Thank you for your business.</p>

<div class="footer">IKR Consultancy &middot; ABN 61 728 427 785 &middot; Web Design &amp; Development</div>

</div>
</body></html>'''

build_invoice(invoice_html, 'Invoice_INV-001_Website_Development.pdf')
