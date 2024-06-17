/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns:[
            {
                protocol:'http',
                hostname:'localhost',
                port: '3000'
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
              },
        ]
    }
};

export default nextConfig;
