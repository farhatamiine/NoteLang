// next.config.js
import withPWA from 'next-pwa';

const nextPWA = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
    reactStrictMode: true,
};

export default nextPWA(nextConfig);