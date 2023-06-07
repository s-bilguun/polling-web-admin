/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/polls/:pollid',
          destination: '/polls/[pollid]',
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  