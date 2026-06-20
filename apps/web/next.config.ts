import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 💡 ปรับการตั้งค่าอนุมัติโดเมน Unsplash ให้เป็นฟอร์แมตนี้ครับ
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // อนุญาตให้เข้าถึงพาร์ทรูปภาพย่อยทั้งหมดข้างใน
      },
    ],
  },
};
export default nextConfig;
