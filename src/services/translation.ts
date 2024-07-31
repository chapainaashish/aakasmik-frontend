import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import translationEN from "../translations/en/translation.json";
import translationNE from "../translations/ne/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ne: {
    translation: translationNE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default { translate: i18n };
