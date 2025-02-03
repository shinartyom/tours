// ----------------------------------------------------------------------

export type LanguageValue = 'en' | 'ru' | 'uz';

export const fallbackLng = 'en';
export const languages = ['en', 'ru', 'uz'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  ru: {
    success: 'Язык изменен!',
    error: 'Ошибка при смене языка!',
    loading: 'Загрузка...',
  },
  uz: {
    success: "Til o'zgartirildi!",
    error: "Til o'zgartirishda xatolik!",
    loading: 'Yuklanmoqda...',
  },
};
