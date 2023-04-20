import { useI18n } from 'vue-i18n';

export function useLang() {
  const localeUserSetting = useCookie<ILocale>('locale');
  const { locale, t } = useI18n();
  watch(localeUserSetting, (val) => (locale.value = val));

  const config = useRuntimeConfig();
  const defaultLocale = config.public.APP_DEFAULT_LANGUAGE as ILocale;

  function setup() {
    localeUserSetting.value = getUserLocale();
  }
  function getUserLocale(): ILocale {
    return localeUserSetting.value || getSystemLocale();
  }
  function getSystemLocale(): ILocale {
    try {
      // NOTE: get default language or language from system
      return defaultLocale || (window ? window.navigator.language.substring(0, 2) : 'en');
    } catch (error) {
      return defaultLocale;
    }
  }

  return { localeUserSetting, setup, t };
}
