/** @type {import('next').NextConfig} */
const nextConfig = {
    //reactStrictMode: true,
    output: "export",
    distDir: "deployment",
    images: {
    unoptimized: true,
    },
  };
  
  export default nextConfig;