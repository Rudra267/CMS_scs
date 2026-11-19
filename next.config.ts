import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keep local development builds fresh while the CMS UI is being edited.
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
