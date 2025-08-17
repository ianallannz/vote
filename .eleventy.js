const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const { JSDOM } = require("jsdom");

module.exports = function (eleventyConfig) {
  // Add date filter
  eleventyConfig.addFilter("date", function (dateObj, format) {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("dateISO", dateObj => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    if (isNaN(date.getTime())) return "";
    return date.toISOString();
  });

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://ianallan.vote",
    },
  });

eleventyConfig.addFilter("extractHeadings", content => {
    const dom = new JSDOM(content);

    const headings = [...dom.window.document.querySelectorAll("h2, h3")]
      .filter(h => h.id) // explicitly exclude headings without IDs
      .map(h => ({
        id: h.id,
        text: h.textContent,
        level: h.tagName.toLowerCase()
      }));

    return headings;
  });

  eleventyConfig.addCollection("events", collection => {
  return collection.getFilteredByTag("posts")
    .filter(post => post.data.isEvent && post.data.eventDate)
    .sort((a, b) => new Date(a.data.eventDate) - new Date(b.data.eventDate));
});

  const markdownLib = markdownIt({ html: true })
    .use(markdownItAnchor)
    .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);

  // Copy directories
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
