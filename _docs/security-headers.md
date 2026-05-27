# Security headers (for Cloudflare Pages / Netlify)

If you move hosting to Cloudflare Pages or Netlify, copy this file to the publish root as `_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com https://formsubmit.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com; base-uri 'self'; form-action 'self'
```

GitHub Pages does not support custom HTTP headers. The live site uses equivalent `<meta http-equiv="...">` tags in each HTML page instead.
