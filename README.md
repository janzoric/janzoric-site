# janzoric.com

Jan Zorič's website. Plain HTML/CSS with a little JavaScript, built with
[Eleventy](https://www.11ty.dev/). Everything (text, photos, fonts) lives in this folder.

> The full guide for the yearly portfolio update ("HOW TO MANAGE MY WEBSITE") comes once
> the CMS is connected to GitHub. This file covers previewing and editing locally.

## Preview on your Mac

**Easiest:** double-click `Predogled.command`. A Terminal window opens and the site
appears at <http://localhost:8080>. Changes you save show up in the browser by themselves.
Close the Terminal window to stop.

Or in Terminal:

```bash
cd ~/Desktop/"NOVA AI STRAN"/janzoric-site
npm install   # only the first time
npm start
```

The first start takes ~30 seconds while the photos are processed.

## Where things are

| What | File |
|---|---|
| Homepage text & photos | `src/index.njk` |
| KDO JE TA MODEL? | `src/kdo-je-ta-model.njk` |
| PORTFOLIO page | `src/portfolio.njk` (rows: `src/_includes/justify.njk`, lightbox: `src/js/portfolio.js`) |
| **Portfolio photos & their order** | `src/_data/portfolio.yml` + photos in `src/photos/portfolio/` |
| **Packages & prices** | `src/_data/paketi.yml` |
| Photo descriptions (alt text, for Google) | `src/_data/opisi.yml` – optional line per photo |
| Privacy page | `src/zasebnost.njk` |
| Extra reviews on the homepage | `src/_data/mnenja.yml` |
| KONTAKT | `src/kontakt.njk` |
| Site name, email, Instagram, s.p. details, form address, GoatCounter code, photo credit | `src/_data/site.json` |
| Menu | `src/_includes/header.njk` |
| Footer, page frame, SEO tags | `src/_includes/base.njk` |
| Hand-drawn arrows | `src/_includes/arrows.svg` |
| Paper texture & torn edges | `src/static/textures/` (bands: add class `band` to a section) |
| Pressed plants (fern, gypsophila) | `src/static/flora/` |
| Easter egg game "Ujemi šopek" (5× click on JAN. on the homepage, or "[dolgčas mi je]" in the footer) | `src/js/sopek.js` |
| All styling | `src/css/style.css` |
| Photos used on the pages | `src/photos/site/` |
| Videos | `src/media/` |
| CMS settings | `src/admin/config.yml` |
| Publishing to GitHub Pages | `.github/workflows/deploy.yml` |

Text is plain text inside the `.njk` files – change the words between the tags, save, look
at the browser. `<br>` is a line break.

## Photos

- Put JPEGs in, the build makes the web versions (WebP + JPEG, 5 sizes, sRGB, metadata
  removed). Don't pre-shrink below ~2400 px on the long edge.
- Portfolio order = the order of lines in `src/_data/portfolio.yml`.
- Photos are shown in rows that fill the width; every 17th and 18th photo is shown larger
  side by side (a "spread"), so put two strong photos in those places.

## Build without previewing

```bash
npm run build      # result in _site/
```
