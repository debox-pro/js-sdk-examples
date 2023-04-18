/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['@debox-global/react', '@debox-global/ui', '@debox-global/core'],
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
