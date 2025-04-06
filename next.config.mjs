import nextPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [],
  },
};

export default nextPWA({
  ...nextConfig,
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Suas configurações de cache existentes...
  ],
  // Adicione isto para ignorar arquivos problemáticos:
  buildExcludes: [
    /app-build-manifest\.json$/,
    /middleware-manifest\.json$/,
    /react-refresh\.js$/,
    /\.map$/,
    /_buildManifest\.js$/
  ],
  // Opcional: desativa precache de manifests
  exclude: [
    /.*build-manifest.*/,
    /.*manifest.*\.map$/
  ]
});