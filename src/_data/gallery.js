// Reads the ordered photo list in portfolio.yml and adds what the page needs:
// each photo's shape (aspect ratio) and whether it belongs to a "spread".
// The order always stays exactly as in portfolio.yml. The rows themselves are
// laid out in the browser (src/_includes/justify.njk) so they fill any screen width.
import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import Image from "@11ty/eleventy-img";

const DATA_FILE = "src/_data/portfolio.yml";
const ALT_FILE = "src/_data/opisi.yml"; // optional descriptions, keyed by file name

// Every SPREAD_EVERY photos, the last two are shown larger, side by side.
const SPREAD_EVERY = 18;

async function readPhoto(src) {
  const file = path.join("src", src);
  const stats = await Image(file, { statsOnly: true, formats: ["jpeg"], widths: ["auto"] });
  const { width, height } = stats.jpeg[0];
  return { src, width, height, ratio: +(width / height).toFixed(4), portrait: height > width };
}

export default async function () {
  const { photos = [] } = loadYaml(fs.readFileSync(DATA_FILE, "utf8")) || {};
  const items = await Promise.all(photos.filter(Boolean).map(readPhoto));
  const opisi = fs.existsSync(ALT_FILE) ? loadYaml(fs.readFileSync(ALT_FILE, "utf8")) || {} : {};

  items.forEach((item, i) => {
    item.index = i;
    item.no = String(i + 1).padStart(3, "0");
    item.spread = i % SPREAD_EVERY >= SPREAD_EVERY - 2;
    item.alt = opisi[path.basename(item.src)] || `Poročna fotografija ${i + 1}`;
  });

  return { items, count: items.length };
}
