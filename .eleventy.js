const sitemap = require("@quasibit/eleventy-plugin-sitemap");


module.exports = function(eleventyConfig) {
  // Add date filter
  eleventyConfig.addFilter("date", function(dateObj, format) {
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
