import ar from "./ar";
import en from "./en";

export const locales = { ar, en };
export const localeNames = { ar: "العربية", en: "English" };
export const defaultLocale = "ar";

export function getLocale(lang) {
  return locales[lang] || locales[defaultLocale];
}
