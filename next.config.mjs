/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  devIndicators: false,
  images: { 
    unoptimized: true,
  },
}

export default nextConfig
