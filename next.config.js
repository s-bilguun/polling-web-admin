/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/poll/:pollid',
          destination: '/poll/[pollid]',
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  