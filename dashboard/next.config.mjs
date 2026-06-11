/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/project-vista/dashboard', // Links your CSS/JS files to the subfolder path
  assetPrefix: '/project-vista/dashboard/', // Ensures graphics and layout files load correctly
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
