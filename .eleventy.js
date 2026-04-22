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
   * Uso: {{ dateObj | date('Y') }} → "2026"
   * Uso: {{ dateObj | date('full') }} → "22 de abril de 2026"
   */
  eleventyConfig.addFilter("date", (dateObj, format) => {
    // Se não for passado um objeto Date válido, usa a data atual
    const date = dateObj instanceof Date && !isNaN(dateObj) ? dateObj : new Date();
    
    // Formatos suportados
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
        // Retorna string ISO como fallback
        return date.toISOString();
    }
  });

  /**
   * Filtro 'year' simplificado apenas para o copyright
   * Uso: {{ year }} → "2026"
   */
  eleventyConfig.addFilter("year", () => new Date().getFullYear().toString());

  // =================================================================
  // ➕ DADOS GLOBAIS
  // =================================================================
  
  /**
   * Disponibiliza objeto 'now' com a data/hora do build
   * Uso: {{ now | date('Y') }} no footer
   */
  eleventyConfig.addGlobalData("now", () => new Date());
  
  /**
   * Disponibiliza 'buildTimestamp' para cache-busting
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
    // Opcional: melhorar logs durante o build
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}