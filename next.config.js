/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://carcustomvisionjeric-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/3283d16e-126a-4540-bfc8-08f579004922/classify/iterations/Iteration5/url",
      },
    ];
  },
  distDir: "build",
  output: "standalone",
};

module.exports = nextConfig;
