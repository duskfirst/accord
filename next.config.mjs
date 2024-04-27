/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "via.placeholder.com",
                pathname: "**",
                protocol: "https",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
