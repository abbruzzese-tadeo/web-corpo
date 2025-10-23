const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    locales: ["es", "en", "pt"],
    defaultLocale: "es",
  },
  experimental: {
    appDir: false,
  },
  // 👇 Agregar esta línea:
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // 👇 Agregar esta para usar /src
  distDir: ".next",
  // 👇 Importante: Next detectará /src/pages automáticamente
  // si definís "srcDir": "src" en tu estructura de proyecto
};
module.exports = nextConfig;
