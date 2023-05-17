
const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  reactStrictMode: true,
  experimental: {
		// https://github.com/vercel/next.js/issues/42277
    serverComponentsExternalPackages: ['mongoose']
  }
});

module.exports = nextConfig;
