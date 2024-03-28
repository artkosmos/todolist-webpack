import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import enHeader from '../../public/locales/en/header.json';
import enHome from '../../public/locales/en/home.json';
import enTask from '../../public/locales/en/task.json';
import ruHeader from '../../public/locales/ru/header.json';
import ruHome from '../../public/locales/ru/home.json';
import ruTask from '../../public/locales/ru/task.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      home: enHome,
      task: enTask,
      header: enHeader,
    },
    ru: {
      home: ruHome,
      task: ruTask,
      header: ruHeader,
    },
  },
});

export default i18n;
