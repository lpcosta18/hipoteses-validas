// .eleventy.js
// Configuração Eleventy - Hipóteses Válidas
// Formato: ES Modules (export default)

export default function (eleventyConfig) {
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("header.js");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("fonts");

  // Template formats
  eleventyConfig.setTemplateFormats(["njk", "html"]);

  // Filtro de datas
  eleventyConfig.addFilter("date", (dateObj, format) => {
    const date = dateObj instanceof Date && !isNaN(dateObj) ? dateObj : new Date();
    
    if (format === 'Y') {
      return date.getFullYear().toString();
    }
    if (format === 'full') {
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    }
    if (format === 'short') {
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    return date.toISOString();
  });

  // Dados globais
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear().toString());
  eleventyConfig.addGlobalData("now", () => new Date());
  eleventyConfig.addGlobalData("buildTimestamp", () => Date.now());
  eleventyConfig.addGlobalData("siteUrl", "https://hipoteses-validas.pt");
  eleventyConfig.addGlobalData("vercelAnalyticsId", process.env.VERCEL_ANALYTICS_ID || '');

  // Configuração de output
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}