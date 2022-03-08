/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { domains: ['skin.ovesnovs.com'] },
};

module.exports = nextConfig;
