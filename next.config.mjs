/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "assets.science.nasa.gov" },
      { protocol: "https", hostname: "en.wikipedia.org" },
      { protocol: "https", hostname: "hips.hearstapps.com" }
    ]
  }
};

export default nextConfig;
