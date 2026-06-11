/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // Optimizes pages for exact /folder/index.html generation
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
