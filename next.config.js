/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
    ],
  },
};

module.exports = nextConfig;
