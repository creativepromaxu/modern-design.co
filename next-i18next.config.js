const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    localeDetection: false,
  },
  // إضافة هذا السطر لتحديد مكان المجلد بدقة
  localePath: path.resolve('./public/locales'),
}