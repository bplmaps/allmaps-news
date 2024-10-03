// See https://observablehq.com/framework/config for documentation.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path/posix";
// import { Latest } from "@allmaps/latest";

const SITE_NAME = "Allmaps News";
const HTTP_ROOT = "https://allmaps-outlines.observablehq.cloud/";
const SRC_ROOT = "src";

export default {
    content: [
    './node_modules/@allmaps/ui/dist/components/**/*.{svelte,ts}',
    './node_modules/@allmaps/latest/dist/components/**/*.{svelte,ts}',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  // The app’s title; used in the sidebar and webpage titles.
  title: SITE_NAME,

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    { name: "What is Allmaps?", path: "/what-is-allmaps" },
    { name: "2024 Convening", path: "/2024-convening" },
    { name: "News and Updates", path: "/news-and-updates/index" },
    { name: "Allmaps Research Fellows", path: "/allmaps-research-fellows" },
    { name: "About the Grant", path: "/about-the-grant"},
    { name: "Stay in touch", path: "/stay-in-touch" },
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head,

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  style: "custom-style.css",
  // theme: "glacier", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer,
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // cleanUrls: true, // drop .html from URLs
};

function footer({ path }) {
  return `
  Built with <a href="https://observablehq.com/framework/">Observable Framework</a>. 
  Remixed from the <a href="https://github.com/tu-delft-heritage/openmapsmeeting/blob/main/src${path}.md?plain=1">Open Maps Meeting</a> site.
  View source on <a href="https://github.com/bplmaps/allmaps-news">GitHub</a>.
  `;
}

function head({ path, title }) {
  return `<link rel="icon" type="image/png" href="/favicon.png" sizes="32x32">
  <meta property="og:title" content=${JSON.stringify(title ?? SITE_NAME)}>
  <meta name="description" property="og:description" content="News and updates from LMEC and AGSL about the Allmaps Project" />
  <meta property="og:type" content="website">
  ${og_image()}`;
}

// From:
// https://github.com/observablehq/framework/discussions/1199#discussioncomment-10624165
// https://github.com/fil/pangea/blob/main/observablehq.config.ts#L97

function og_image() {
  try {
    // computes the same hash as framework 🌶
    const contents = readFileSync(join(SRC_ROOT, `assets/opengraph.jpg`));
    const key = createHash("sha256").update(contents).digest("hex").slice(0, 8);
    const esc_img = JSON.stringify(
      `${HTTP_ROOT}_file/assets/opengraph.${key}.jpg`
    );
    return `<meta name="image" property="og:image" content=${esc_img} />
            <meta property="twitter:image" content=${esc_img} />
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="675">
            <link href="/assets/opengraph.jpg">`;
  } catch (error) {
    return "";
  }
}