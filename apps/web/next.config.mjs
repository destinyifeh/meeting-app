/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@vms/ui"],
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
