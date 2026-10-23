// Eleventy build configuration.
// Turns the templates in /src into a plain static website in /_site.
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  // Data files may be written in YAML (portfolio.yml, paketi.yml) – easier for the CMS.
  eleventyConfig.addDataExtension("yml,yaml", (contents) => loadYaml(contents));

  // Files copied as they are.
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Every <img> in the finished pages becomes a responsive <picture>
  // (WebP + JPEG, several widths, sRGB, metadata stripped, width/height set).
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [480, 800, 1200, 1600, 2400],
    sharpWebpOptions: { quality: 82 },
    sharpJpegOptions: { quality: 82, progressive: true, mozjpeg: true },
    // Readable file names help image search: porocna-fotografija-012-a1b2c3-800.webp
    filenameFormat: (id, src, width, format) => {
      const name = path.basename(src, path.extname(src)).replace(/^portfolio-/, "porocna-fotografija-");
      return `${name}-${id.slice(0, 6)}-${width}.${format}`;
    },
    htmlOptions: {
      imgAttributes: { loading: "lazy", decoding: "async" },
    },
  });

  // While testing on a temporary GitHub address (username.github.io/repo/)
  // all links need the /repo/ prefix. Set by the deploy workflow, empty locally.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  eleventyConfig.setServerOptions({ port: 8080 });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
  };
}
