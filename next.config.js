/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/sober-motivation",
        destination: "/rise-again",
        permanent: true,
      },
    ];
  },
  poweredByHeader: false
};

module.exports = nextConfig;
