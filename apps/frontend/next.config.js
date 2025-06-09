const path = require("path");

const apiHost = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

module.exports = {
  reactStrictMode: true,
  transpilePackages: [],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: [apiHost],
  },
};
