import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations.js";

const LanguageContext = createContext(null);

const STORAGE_KEY = "site-language"; // stores "bn" | "hi" | "en"
const SUPPORTED = ["bn", "hi", "en"];

// Maps the site's UI language code to the shape admin-entered multilingual
// content actually uses in the database.
const CONTENT_FIELD_KEY = { bn: "bengali", hi: "hindi", en: "english" };
const CONTENT_LABEL = { bn: "Bengali", hi: "Hindi", en: "English" };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : "bn";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    if (SUPPORTED.includes(lang)) setLanguageState(lang);
  };

  // Site-chrome translation (nav labels, headings, buttons — real words,
  // not transliteration). Falls back to Bengali, then the raw key, so a
  // missing translation never crashes the UI or renders blank.
  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] ?? entry.bn ?? key;
  };

  // Picks the right language out of a multilingual content object (e.g. a
  // song's {bengali, hindi, english} lyrics, or a scripture paragraph's
  // {bengali, hindi, english} content), matching the site's selected
  // language. Falls back to whichever language actually has content, since
  // not every admin-entered item is guaranteed to have all three filled in.
  const pickContent = (fields) => {
    if (!fields) return "";
    const preferred = fields[CONTENT_FIELD_KEY[language]];
    if (preferred?.trim()) return preferred;
    return fields.bengali || fields.hindi || fields.english || "";
  };

  // Same idea, but for picking a language *label* out of an item's
  // `language: ["Bengali", "English", ...]` array — used to default a
  // per-item language tab-switcher (like on the song detail page) to the
  // site's selected language when that item actually has it.
  const pickAvailableLanguage = (availableLabels = []) => {
    const preferredLabel = CONTENT_LABEL[language];
    if (availableLabels.includes(preferredLabel)) return preferredLabel;
    return availableLabels[0] || "Bengali";
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, pickContent, pickAvailableLanguage, contentFieldKey: CONTENT_FIELD_KEY[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
