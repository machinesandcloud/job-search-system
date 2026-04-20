import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "pdf-parse", "pdfjs-dist"],
  turbopack: {},
};

export default nextConfig;
