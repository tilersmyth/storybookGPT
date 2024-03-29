/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  output: 'standalone',

  reactStrictMode: true,
  swcMinify: true,

  env: {
    AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
    AWS_COGNITO_POOL_ID: process.env.AWS_COGNITO_POOL_ID,
    AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID,
    AWS_COGNITO_IDENTITY_ID: process.env.AWS_COGNITO_IDENTITY_ID,
    AWS_OAUTH_DOMAIN: process.env.AWS_OAUTH_DOMAIN,
    AWS_OAUTH_REDIRECT_SIGNIN: process.env.AWS_OAUTH_REDIRECT_SIGNIN,
    AWS_OAUTH_REDIRECT_SIGNOUT: process.env.AWS_OAUTH_REDIRECT_SIGNOUT,
  },

  // Uncoment to add domain whitelist
  images: {
    domains: ['tailwindui.com'],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
