const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n, 
  
  // دمج إعادة التوجيه داخل نفس الكائن
  async redirects() {
    return [
      {
        source: '/QuotationModernDesign',
        destination: '/QuotationModernDesign/login',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig;