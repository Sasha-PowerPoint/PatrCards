/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.deckofcardsapi.com',
        port: '',
        pathname: '/static/img/**',
      },
      {
        protocol: 'https',
        hostname: 'deckofcardsapi.com',
        port: '',
        pathname: '/static/img/**',
      },
    ],
  },
}

module.exports = nextConfig