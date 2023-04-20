let intervalCheckTime: NodeJS.Timer;

export function useTheme() {
  const themeUserSetting = useCookie<ITheme>('theme');

  const config = useRuntimeConfig();
  const defaultSystemTheme = config.public.APP_DEFAULT_THEME as ISystemTheme;

  const systemTheme = useState<ISystemTheme>(getSystemTheme);

  function setup() {
    themeUserSetting.value = getUserThemeSetting();

    onMounted(() => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', onThemeSystemChange);
      intervalCheckTime = setInterval(onRealtimeCheck, 1000);
    });
    onBeforeUnmount(() => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onThemeSystemChange);
      if (intervalCheckTime) clearInterval(intervalCheckTime);
    });
  }
  function onThemeSystemChange() {
    if (themeUserSetting.value === 'system') {
      systemTheme.value = getSystemTheme();
    }
  }
  function onRealtimeCheck() {
    if (themeUserSetting.value === 'realtime') {
      systemTheme.value = getRealtimeTheme();
    }
  }
  function getRealtimeTheme(): ISystemTheme {
    const now = new Date();
    const hour = now.getHours();
    const isNight = hour >= 17 || hour <= 5;

    return isNight ? 'dark' : 'light';
  }
  function getUserThemeSetting(): ITheme {
    return themeUserSetting.value || getSystemTheme();
  }
  function getSystemTheme(): ISystemTheme {
    try {
      switch (themeUserSetting.value) {
        case 'dark':
        case 'light':
          return themeUserSetting.value;
        case 'realtime':
          return getRealtimeTheme();
        default:
          if (!isClient()) {
            return defaultSystemTheme;
          }

          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (error) {
      return defaultSystemTheme;
    }
  }

  return { setup, systemTheme, themeUserSetting };
}
