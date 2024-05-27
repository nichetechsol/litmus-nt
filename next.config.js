
/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix :"",
  distDir: 'build',
  images: {
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
// module.exports = {
//   distDir: 'build',
// }
