import { type MaybeRef, get } from '@vueuse/core';

interface SEOOptions {
  content?: string;
  description?: string;
  image?: string;
  keywords?: string;
  pageTitle?: string;
  theme?: ISystemTheme;
  title?: string;
  url?: string;
}

export function useMetaTag(options?: MaybeRef<SEOOptions | undefined>) {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { systemTheme } = useTheme();
  const metaOptions = computed(() => ({
    theme: systemTheme.value,
    url: route.fullPath,
    ...get(options),
  }));

  useHead({
    link: [{ href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' }],
    meta: computed(() => getSEOMetaTag(config, metaOptions.value)),
    title: metaOptions.value.pageTitle || config.public.APP_NAME,
    titleTemplate: `%s - ${config.public.APP_NAME}`,
  });
}

function getSEOMetaTag(config: ReturnType<typeof useRuntimeConfig>, options?: SEOOptions) {
  const themeColor = options?.theme === 'dark' ? '#000' : '#fff';

  let { url, image, content, keywords, description, title } = options || {};
  url = url || config.public.BASE_URL;
  title = title || config.public.META_TITLE;
  content = content || config.public.META_CONTENT;
  image = image || config.public.META_IMAGE;
  keywords = keywords || config.public.META_KEYWORDS;
  description = description || config.public.META_DESCRIPTION;

  return [
    {
      content: themeColor,
      hid: 'theme-color',
      name: 'theme-color',
      property: 'theme-color',
    },
    {
      content: 'webkit',
      hid: 'renderer',
      name: 'renderer',
      property: 'renderer',
    },
    {
      content: 'no',
      hid: 'wap-font-scale',
      name: 'wap-font-scale',
      property: 'wap-font-scale',
    },
    {
      content: config.public.APP_NAME,
      hid: 'author',
      name: 'author',
      property: 'author',
    },
    {
      content: 'INDEX,FOLLOW',
      hid: 'robots',
      name: 'robots',
      property: 'robots',
    },
    {
      content: '/favicon.ico',
      hid: 'icon',
      name: 'icon',
      property: 'icon',
    },
    {
      content: 'yes',
      hid: 'apple-mobile-web-app-capable',
      name: 'apple-mobile-web-app-capable',
      property: 'apple-mobile-web-app-capable',
    },
    {
      content: 'yes',
      hid: 'mobile-web-app-capable',
      name: 'mobile-web-app-capable',
      property: 'mobile-web-app-capable',
    },
    {
      content: config.public.APP_NAME,
      hid: 'apple-mobile-web-app-title',
      name: 'apple-mobile-web-app-title',
      property: 'apple-mobile-web-app-title',
    },
    {
      content: 'yes',
      hid: 'full-screen',
      name: 'full-screen',
      property: 'full-screen',
    },
    { charset: 'utf-8' },
    { content: 'text/html; charset=UTF-8', 'http-equiv': 'Content-Type' },
    { content: 'no', 'http-equiv': 'imagetoolbar' },
    { content: 'IE=edge', 'http-equiv': 'X-UA-Compatible' },
    { content: 'no-siteapp', 'http-equiv': 'Cache-Control' },
    { content },
    {
      content:
        'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
      hid: 'viewport',
      name: 'viewport',
      property: 'viewport',
    },
    {
      content: keywords,
      hid: 'keywords',
      name: 'keywords',
      property: 'keywords',
    },
    {
      content: description,
      hid: 'description',
      name: 'description',
      property: 'description',
    },
    {
      content: config.public.APP_NAME,
      hid: 'og:site_name',
      name: 'og:site_name',
      property: 'og:site_name',
    },
    {
      content: 'vi-vn',
      hid: 'og:locale',
      name: 'og:locale',
      property: 'og:locale',
    },
    {
      content: 'vi-vn',
      hid: 'og:locale:alternate',
      name: 'og:locale:alternate',
      property: 'og:locale:alternate',
    },
    {
      content: url,
      hid: 'og:url',
      name: 'og:url',
      property: 'og:url',
    },
    {
      content: 'website',
      hid: 'og:type',
      name: 'og:type',
      property: 'og:type',
    },
    {
      content: description,
      hid: 'og:description',
      name: 'og:description',
      property: 'og:description',
    },
    {
      content: title,
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
    },
    {
      content: image,
      hid: 'og:image',
      name: 'og:image',
      property: 'og:image',
    },
    {
      content: image,
      hid: 'og:image:url',
      name: 'og:image:url',
      property: 'og:image:url',
    },
    {
      content: image,
      hid: 'og:image:secure_url',
      name: 'og:image:secure_url',
      property: 'og:image:secure_url',
    },
    {
      content: `logo.png`,
      hid: 'og:image:alt',
      name: 'og:image:alt',
      property: 'og:image:alt',
    },
    {
      content: 960,
      hid: 'og:image:width',
      name: 'og:image:width',
      property: 'og:image:width',
    },
    {
      content: 540,
      hid: 'og:image:height',
      name: 'og:image:height',
      property: 'og:image:height',
    },
    {
      content: 'summary_large_image',
      hid: 'twitter:card',
      name: 'twitter:card',
      property: 'twitter:card',
    },
    {
      content: config.public.APP_NAME,
      hid: 'twitter:site',
      name: 'twitter:site',
      property: 'twitter:site',
    },
    {
      content: image,
      hid: 'twitter:image',
      name: 'twitter:image',
      property: 'twitter:image',
    },
    {
      content: image,
      hid: 'twitter:image:src',
      name: 'twitter:image:src',
      property: 'twitter:image:src',
    },
    {
      content: title,
      hid: 'twitter:title',
      name: 'twitter:title',
      property: 'twitter:title',
    },
    {
      content: config.public.BASE_URL,
      hid: 'twitter:domain',
      name: 'twitter:domain',
      property: 'twitter:domain',
    },
  ];
}
