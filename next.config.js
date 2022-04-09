/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  future: {
    strictPostcssConfiguration: true,
  },
  experimental: {
    esmExternals: true,
    outputStandalone: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
