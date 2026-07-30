import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // Compile routes when they are requested instead of loading every route at startup.
    preloadEntriesOnStart: false,
    optimizeCss: true,
  },
}

export default nextConfig
