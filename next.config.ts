import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img1.wsimg.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/social-media-mastermind-san-diego",
        destination: "/social-media-mastermind",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
