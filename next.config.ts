import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdf-parse", "pdfjs-dist"],
  webpack: (config) => {
    // pdfjs-dist optionally references canvas (node-only) — alias to false for browser build
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
