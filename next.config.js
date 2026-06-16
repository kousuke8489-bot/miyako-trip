/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/__/auth/:path*',
        destination: 'https://miyako-trip.firebaseapp.com/__/auth/:path*',
      },
      {
        source: '/__/firebase/:path*',
        destination: 'https://miyako-trip.firebaseapp.com/__/firebase/:path*',
      },
    ]
  },
}
module.exports = nextConfig
