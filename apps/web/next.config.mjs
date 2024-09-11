/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@vms/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
