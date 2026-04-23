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
      // Old mastermind paths → new /buzz-mastermind-group
      {
        source: "/social-media-mastermind",
        destination: "/buzz-mastermind-group",
        permanent: true,
      },
      {
        source: "/social-media-mastermind-san-diego",
        destination: "/buzz-mastermind-group",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
