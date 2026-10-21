/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    localPatterns: [
      { pathname: "/**", search: "" },
      // Content versions refresh replaced promo artwork in the image cache.
      { pathname: "/assets/fanline/promoCarousel/*" },
      { pathname: "/assets/fanline/promoSpanish/*" },
    ],
  },
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
