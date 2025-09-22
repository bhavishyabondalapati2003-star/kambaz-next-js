import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["www.staradvertiser.com"], // allow external images from this domain
  },
};

export default nextConfig;
