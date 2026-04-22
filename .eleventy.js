// .eleventy.js
// Configuração Eleventy - Hipóteses Válidas
// Formato: ES Modules (export default)

export default function (eleventyConfig) {
  
  // Copy static assets directly to the output folder
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("header.js");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.setTemplateFormats(["njk", "html"]);

  // =================================================================
  // ➕ FILTROS PERSONALIZADOS
  // =================================================================
  
  /**
   * Filtro 'date' para formatar datas em templates Nunjucks
   * Uso: {{ now | date('Y') }} → "2026"
   * Uso: {{ now | date('full') }} → "22 de abril de 2026"
   */
  eleventyConfig.addFilter("date", (dateObj, format) => {
    const date = dateObj instanceof Date && !isNaN(dateObj) ? dateObj : new Date();
    
    switch (format) {
      case 'Y':
        return date.getFullYear().toString();
      
      case 'full':
        return date.toLocaleDateString('pt-PT', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        });
      
      case 'short':
        return date.toLocaleDateString('pt-PT', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      
      case 'ISO':
        return date.toISOString();
      
      default:
        return date.toISOString();
    }
  });
  
  eleventyConfig.addPassthroughCopy({
  "node_modules/@fortawesome/fontawesome-free/webfonts": "assets/webfonts"
});

  // =================================================================
  // ➕ DADOS GLOBAIS (acessíveis diretamente como {{ variavel }})
  // =================================================================
  
  /**
   * Disponibiliza 'year' como variável global direta
   * Uso: {{ year }} → "2026" ✅
   */
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear().toString());
  
  /**
   * Disponibiliza objeto 'now' para uso com filtro date
   * Uso: {{ now | date('Y') }} → "2026" ✅
   */
  eleventyConfig.addGlobalData("now", () => new Date());
  
  /**
   * Timestamp para cache-busting de assets
   * Uso: <script src="app.js?v={{ buildTimestamp }}">
   */
  eleventyConfig.addGlobalData("buildTimestamp", () => Date.now());

  // =================================================================
  // ➕ CONFIGURAÇÃO DE OUTPUT
  // =================================================================
  
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