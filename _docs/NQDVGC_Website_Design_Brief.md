# NQ Defence Veterans Golf Club Inc. — Website Design Brief

**Prepared for:** NQDVGC Committee
**Date:** April 2026
**Prepared by:** Ika Ryan

---

## 1. About the Project

A new website has been built for NQ Defence Veterans Golf Club Inc. to give the club a professional online presence, make it easy for members and visitors to find information, and help attract new members and sponsors.

The site is ready to go live. This brief outlines what's been built and what the committee needs to provide or confirm before launch.

---

## 2. Website Overview

| Detail | Info |
|---|---|
| **Club name** | NQ Defence Veterans Golf Club Inc. |
| **Location** | 16 Nineteenth Avenue, Kirwan QLD 4817 |
| **Type of site** | Static website (HTML/CSS/JS — no database or login needed) |
| **Pages** | Home, About, Events, Gallery, Committee, Sponsors, Contact |
| **Mobile friendly** | Yes — fully responsive on phones, tablets, and desktops |
| **Accessibility** | Designed for all ages and capabilities (large text, high contrast, keyboard accessible) |

---

## 3. What's Already Built

### Pages & Features

- **Home** — Hero banner, club introduction, upcoming events preview, sponsor marquee, call-to-action buttons
- **About** — Club background, what the club does (golf days, wellbeing, community, social), core values
- **Events** — Full 2026 calendar with event details, Facebook RSVP links, and a registration form (emails go directly to the club)
- **Gallery** — Photo gallery with 21 photos, lightbox viewer, masonry layout
- **Committee** — Placeholder cards for committee members (ready for real names/photos)
- **Sponsors** — Current sponsor logos, "Become a Sponsor" section with benefits
- **Contact** — Contact form (sends directly to club email), address, Facebook link, email

### Technical Features

- Contact form and event registration forms send submissions to **info@nqdefenceveteransgolf.org.au** via FormSubmit.co (no server needed)
- Facebook group links throughout the site
- Smooth animations and scroll effects
- Back-to-top button
- Skip-to-content link for screen reader users

---

## 4. Questions for the Committee

Please review and provide answers so the site can be finalised.

### Club Details

1. Is the club email address **info@nqdefenceveteransgolf.org.au** correct? (This is where all form submissions will go.)
2. Is the address **16 Nineteenth Avenue, Kirwan QLD 4817** correct for the website?
3. Is there a club phone number you'd like listed on the site?
4. Is the Facebook group link correct? https://www.facebook.com/groups/980650744252783

### Committee Page

5. Please provide for each committee member:
   - Full name
   - Role (e.g. President, Vice President, Secretary, Treasurer, Committee Member)
   - A short bio or one-liner (optional)
   - A headshot photo (optional — initials will show if no photo provided)

### Events

6. Are the current events and dates accurate for 2026? Please confirm or update:
   - Captains Cup — 29 Apr @ Tropics Golf Club
   - Monthly Medal (May) — 3 May @ Rowes Bay Golf Club
   - Social Golf Day & BBQ — 17 May @ Willows Golf Club
   - Monthly Medal (June) — 7 Jun @ Rowes Bay Golf Club
   - Charity Ambrose Day — 21 Jun @ Townsville Golf Club
   - Vietnam Veterans Day Golf — 15 Aug @ Townsville Golf Club
   - Annual Club Championship — Nov (Venue TBC)
7. Are there any other events to add?
8. Do any events have dedicated Facebook event pages we should link to? (Currently they all link to the main Facebook group.)

### Sponsors

9. Are the current sponsors correct?
   - Hungry Dog Pet Supplies
   - LJ Hooker Townsville
   - Bullocks Freightlines
   - Townlec Electrical
   - Pirtek Townsville
   - Tropics Golf Club
10. Are there any sponsors to add or remove?
11. Do any sponsors have specific logos they'd prefer us to use?

### About / Branding

12. Is the club description on the homepage accurate? ("Bringing together current and former Australian Defence Force members and their families through the game of golf...")
13. Is there anything in the "About" page content that needs changing?
14. Is the current club logo the correct one to use?

### Gallery

15. Are you happy with the current photos in the gallery?
16. Are there any photos that should be removed? (e.g. anyone who hasn't given permission)
17. Are there additional photos you'd like added?

### Hosting & Domain

18. Does the club have a domain name? (e.g. nqdefenceveteransgolf.org.au)
19. Does the club have hosting arranged, or do you need a recommendation?
    - The site is simple HTML — it can be hosted free or very cheaply on platforms like Netlify, GitHub Pages, or Cloudflare Pages
    - No special server requirements

---

## 5. How to Update the Site

The website is built with plain HTML, CSS, and JavaScript. No special software is required.

**Common updates and how to do them:**

| Task | What to do |
|---|---|
| **Add a new event** | Copy an existing event card in `events.html`, change the date/name/details |
| **Update event details** | Find the event in `events.html` and edit the text |
| **Add a gallery photo** | Put the image in the `images/` folder, add a `<div class="gallery-slot"><img src="images/filename.png" alt="Description"></div>` to `gallery.html` |
| **Add/remove a sponsor** | Edit `sponsors.html` and `index.html` (marquee section) |
| **Update contact info** | Edit `contact.html` and the footer in all pages |
| **Update committee members** | Edit the cards in `committee.html` |

If the committee prefers not to edit files directly, a club member with basic computer skills can be shown how, or updates can be requested through the developer.

---

## 6. Colour Scheme & Fonts

For reference if any print materials need to match:

| Element | Value |
|---|---|
| **Navy** | #1a2a3a |
| **Deep Navy** | #0f1c2a |
| **Olive** | #4a5d3a |
| **Gold** | #c8a84e |
| **Sand** | #f5f0e0 |
| **Cream** | #fdfaf2 |
| **Display Font** | Bebas Neue |
| **Heading Font** | Marcellus |
| **Body Font** | Source Sans 3 |

---

## 7. Next Steps

1. Committee reviews this brief and provides answers to the questions above
2. Developer updates the site with confirmed details
3. Domain and hosting are set up
4. Site goes live
5. FormSubmit.co email verification is completed (a one-time confirmation email)

---

*Any questions — reach out to Ika Ryan.*
