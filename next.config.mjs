/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    locales: ["es", "en", "pt"],
    defaultLocale: "en", // ⚠️ podés dejar "en" si querés, pero si tu home está en español, usá "es"
  },
};

module.exports = nextConfig;
