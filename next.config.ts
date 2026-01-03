import type { NextConfig } from 'next';

// استدعاء إعدادات اللغات من ملف الإعدادات الخاص بها
// @ts-ignore
const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  
  async redirects() {
    return [
      {
        source: '/QuotationModernDesign',
        destination: '/QuotationModernDesign/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;