/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.imgur.com'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: false,
  distDir: 'out',
}

module.exports = nextConfig 