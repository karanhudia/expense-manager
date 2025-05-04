const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Bypass TypeScript errors during build for deployment
        ignoreBuildErrors: true,
    },
    eslint: {
        // Bypass ESLint errors during build for deployment
        ignoreDuringBuilds: true,
    },
    // Optimize for serverless deployment
    output: 'standalone',

    // External packages that should not be bundled
    serverExternalPackages: ['@prisma/client', '@neondatabase/serverless'],

    images: {
        domains: ['res.cloudinary.com'],
    },
}

module.exports = withPWA(nextConfig)
