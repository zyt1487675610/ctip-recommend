/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    // 引用网络图片，需要配置
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nextjs.cn",
      },
    ],
  },
  publicRuntimeConfig: {
    staticFolder: "/public",
    // 配置 assetPrefix，用于指定静态资源的路径，后续修改
    // assetPrefix: process.env.NODE_ENV === "production" ? "/your-subdirectory" : "",
  },
  transpilePackages: ["antd-mobile"],
};

module.exports = nextConfig;
