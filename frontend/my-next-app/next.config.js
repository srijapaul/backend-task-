/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  async rewrites(){
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*' // Proxy to Backend
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

};

module.exports = nextConfig;