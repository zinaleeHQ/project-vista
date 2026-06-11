/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/project-vista/dashboard',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
