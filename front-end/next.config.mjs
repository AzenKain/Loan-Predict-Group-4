/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {

    },
    // rewrites: async () => {
    //     return [
    //       {
    //         source: "/api/:path*",
    //         destination: "/api/",
    //       },
    //     ];
    //   },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'svgrepo.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'svgrepo.com',
                pathname: '**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, 
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
  };
  
  export default nextConfig;
  