/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/project-vista/dashboard',
  images: {
    unoptimized: true,
  },
  // Tells Next.js to allow custom page structures
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
