import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "*": ["./app/generated/prisma/**/*", "./node_modules/.prisma/client/**/*"],
  },
};

export default nextConfig;
