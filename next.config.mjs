/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "deployment",
  images: {
    unoptimized: true,
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/whitepaper': { page: '/whitepaper' },
    }
  },
};

export default nextConfig;
