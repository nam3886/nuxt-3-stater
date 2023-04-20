import { useI18n } from 'vue-i18n';

export function useLang() {
  const localeUserSetting = useCookie<AppLocale>('locale');
  const { locale, t } = useI18n();
  watch(localeUserSetting, (val) => (locale.value = val));

  const config = useRuntimeConfig();
  const defaultLocale = config.public.APP_DEFAULT_LANGUAGE as AppLocale;

  function setup() {
    localeUserSetting.value = getUserLocale();
  }
  function getUserLocale(): AppLocale {
    return localeUserSetting.value || getSystemLocale();
  }
  function getSystemLocale(): AppLocale {
    try {
      // NOTE: get default language or language from system
      return defaultLocale || (window ? window.navigator.language.substring(0, 2) : 'en');
    } catch (error) {
      return defaultLocale;
    }
  }

  return { localeUserSetting, setup, t };
}
