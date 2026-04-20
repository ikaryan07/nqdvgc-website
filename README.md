# NQ Defence Veterans Golf Club Inc. — Website

A professional website for the NQ Defence Veterans Golf Club Inc., a not-for-profit organisation based in Townsville, Queensland.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero banner, features, about preview, stats, CTA |
| About | `about.html` | Club story, mission, values, timeline |
| Membership | `membership.html` | Membership tiers, eligibility, how to join |
| Events | `events.html` | Upcoming golf days and events calendar |
| Gallery | `gallery.html` | Photo gallery (placeholders — add your images) |
| Committee | `committee.html` | Committee members and governance info |
| Sponsors | `sponsors.html` | Sponsor tiers, current sponsors, become a sponsor |
| Contact | `contact.html` | Contact form, details, and map placeholder |

## Project Structure

```
nqdvgc-website/
├── css/
│   └── styles.css          # All styles (responsive)
├── js/
│   └── main.js             # Navigation, form handling, animations
├── images/                  # Place your images here
├── index.html
├── about.html
├── membership.html
├── events.html
├── gallery.html
├── committee.html
├── sponsors.html
├── contact.html
└── README.md
```

## How to View

Open `index.html` in any web browser — no server required for basic viewing.

For local development with live reload, you can use any simple server:

```bash
# Python
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code — use the "Live Server" extension
```

## Customisation Checklist

- [ ] Add club logo to `images/` and update the logo element in the header
- [ ] Replace placeholder photos in the Gallery page with real images
- [ ] Add committee member names and photos
- [ ] Add real sponsor logos and details
- [ ] Update contact email and phone number across all pages
- [ ] Add the club's ABN in the footer
- [ ] Embed a Google Map on the Contact page
- [ ] Connect the contact form to a real backend (e.g. Formspree, Netlify Forms)
- [ ] Add real social media links (Facebook, Instagram)
- [ ] Update membership fees if the example amounts differ from actual
- [ ] Update event dates/details as the calendar evolves

## Hosting Options

| Option | Cost | Notes |
|--------|------|-------|
| GitHub Pages | Free | Great for static sites |
| Cloudflare Pages | Free | Fast CDN, custom domain support |
| Netlify | Free tier | Form handling included |
| VentraIP (AU) | ~$5/month | Australian hosting, `.com.au` domains |

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, responsive design
- **Vanilla JavaScript** — No frameworks or dependencies
- **Google Fonts** — Inter + Playfair Display
