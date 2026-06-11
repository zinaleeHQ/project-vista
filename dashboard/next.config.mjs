/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/project-vista/dashboard',
  trailingSlash: true, // Forces /dashboard to emit /dashboard/index.html
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
