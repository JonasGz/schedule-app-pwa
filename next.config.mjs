import withPWA from 'next-pwa';

export default withPWA({
  dest: 'public',
  register: true, 
  skipWaiting: true,
  exclude: [
    ({asset, compilation}) => {
      return true;
    },
  ]
});