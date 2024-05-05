/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "**", // TODO: Change it back to via.placeholder.com
                protocol: "https",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
