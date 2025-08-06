const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

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
