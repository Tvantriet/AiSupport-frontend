import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationNL from "./locales/nl.json";

const resources = {
  nl: {
    translation: translationNL,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "nl",
    fallbackLng: "nl",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
