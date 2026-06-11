/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/project-vista/dashboard',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
