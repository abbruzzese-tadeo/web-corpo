/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  i18n: {
    locales: ["es", "en", "pt"],
    defaultLocale: "es",
  },
};

module.exports = nextConfig;
