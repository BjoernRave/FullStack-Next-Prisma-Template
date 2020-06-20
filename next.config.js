const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withOffline = require('next-offline')

require('dotenv').config()

module.exports = withOffline(
  withBundleAnalyzer({
    target: 'serverless',
    env: {
      BASE_URL: process.env.BASE_URL,
    },
    transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
    // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
    // turn on the SW in dev mode so that we can actually test it

    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  })
)
