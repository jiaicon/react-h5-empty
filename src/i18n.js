import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_US from './utils/en_US';
import zh_CN from './utils/zh_CN';

const options = {
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys
  nsSeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  fallbackLng: ['en-US'],

  react: {
    wait: true,
  },
};
options.resources = {
  'en-US': {
    ...en_US,
  },
  'zh-CN': {
    ...zh_CN,
  },
};

export default () => {
  i18n.use(LanguageDetector).init(options);
  return i18n;
};
