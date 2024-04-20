const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  register: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  }
});

/** @type {import('next').NextConfig} */

const headers = [
  "Accept", "Accept-Version", "Content-Length",
  "Content-MD5", "Content-Type", "Date", "X-Api-Version",
  "X-CSRF-Token", "X-Requested-With",
];


const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      pathname: '**',
    },],
  },
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/api/(.*)",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: 'Access-Control-Allow-Origin', value: `${process.env.NEXTAUTH_URL}` },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: headers.join(", ") }
      ]
    }];
  }
}

module.exports = withPWA(nextConfig);