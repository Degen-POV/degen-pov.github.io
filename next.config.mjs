/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "deployment",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
