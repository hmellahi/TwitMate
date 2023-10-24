const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress:false,
  images: {
    minimumCacheTTL: 864000, // 10days
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  experimental: {
    serverActions: true,
  },
  // compress: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.francetvinfo.fr",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg|txt|css|xml|js|vtt|xml|rss|atom|json|atomxml|fontobject|fonttff|fontotf|fonttruetype|webappjson|xhtml|bin|woff2|ico|bmp|webp|woff|woff2|eot|otf|ttf|woff|woff2|eot|otf|ttf|svg|ico|bmp|webp|woff|woff2|eot|otf|ttf|bin)$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );

    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg|txt|css|xml|js|vtt|xml|rss|atom|json|atomxml|fontobject|fonttff|fontotf|fonttruetype|webappjson|xhtml|bin|woff2|ico|bmp|webp|woff|woff2|eot|otf|ttf|woff|woff2|eot|otf|ttf|svg|ico|bmp|webp|woff|woff2|eot|otf|ttf|bin)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      })
    );
    return config;
  },
};

module.exports = nextConfig;
