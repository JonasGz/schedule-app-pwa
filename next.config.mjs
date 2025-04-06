// next.config.mjs
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [],
  },
};

export default nextPWA({
  ...baseConfig, // Mescla com suas configurações base
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Desativa em dev
  register: true,
  skipWaiting: true,
  // Removido swSrc para usar o SW padrão do next-pwa
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
        }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'image-assets',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 dias
        }
      }
    },
    {
      urlPattern: /\.(?:js|css|woff2)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'static-assets',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 dias
        }
      }
    }
  ],
  exclude: [
    /_next\/app-build-manifest\.json$/,
    /_next\/middleware-manifest\.json$/,
    /_next\/react-refresh\.js$/,
    /\.map$/ // Adicionado para excluir source maps
  ],
  dynamicStartUrl: false // Otimização para evitar recarregamento da página inicial
});