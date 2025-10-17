import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3001/api",
  },
  images: {
    domains: ["localhost", "s3.amazonaws.com"],
  },
};

export default nextConfig;
