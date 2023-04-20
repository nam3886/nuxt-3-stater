import IconsResolver from 'unplugin-icons/resolver';
import UnpluginComponentsVite from 'unplugin-vue-components/vite';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // app config
  app: {
    layoutTransition: { mode: 'out-in', name: 'layout' },
    // global transition
    pageTransition: { mode: 'out-in', name: 'page' },
  },

  // build
  build: {
    transpile: ['vue-toastification'],
  },

  // auto import components
  // components: true,
  components: {
    dirs: [
      { extensions: ['.vue'], path: '~/components/atoms' },
      { extensions: ['.vue'], path: '~/components/molecules' },
      { extensions: ['.vue'], path: '~/components/organisms' },
      { extensions: ['.vue'], path: '~/components' }, // Make sure this is always the last element in the array.
    ],
  },

  // css
  css: [
    'vue-toastification/dist/index.css',
    'viewerjs/dist/viewer.css',
    '~/assets/sass/vendor.scss',
    '~/assets/sass/app.scss',
  ],

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      availableLocales: ['en', 'vi'],
      fallbackLocale: 'en',
      locale: 'en',
    },
  },

  lodash: {
    prefixSkip: false,
  },

  macros: {
    betterDefine: true,
    defineOptions: true,
    setupComponent: false,
    setupSFC: false,
  },

  // modules
  modules: [
    '@nuxtjs/device',
    '@nuxtjs/robots',
    'nuxt-lodash',
    '@vue-macros/nuxt',
    'nuxt-typed-router',
    'unplugin-icons/nuxt',
    '@intlify/nuxt3',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-windicss',
  ],

  nuxtTypedRouter: {
    plugin: true,
  },

  // plugins
  plugins: [],

  robots: {
    /* module options */
    rules: [
      { UserAgent: '*' },
      { Disallow: '/' },
      { BlankLine: true },
      { Comment: 'Comment here' },

      // Be aware that this will NOT work on target: 'static' mode
      { Sitemap: (req: any) => `https://${req.headers.host}/sitemap.xml` },
    ],
  },

  runtimeConfig: {
    ACCOUNT_PASSWORD_TEST: process.env.NUXT_ACCOUNT_PASSWORD_TEST,
    ACCOUNT_USER_NAME_TEST: process.env.NUXT_ACCOUNT_USER_NAME_TEST,
    MODE: process.env.NUXT_MODE,
    public: {
      APP_DEFAULT_LANGUAGE: process.env.NUXT_PUBLIC_APP_DEFAULT_LANGUAGE,
      APP_DEFAULT_THEME: process.env.NUXT_PUBLIC_APP_DEFAULT_THEME,
      APP_DOMAIN_NAME: process.env.NUXT_PUBLIC_APP_DOMAIN_NAME,
      APP_DOWNLOAD_URL: process.env.NUXT_PUBLIC_APP_DOWNLOAD_URL,
      APP_NAME: process.env.NUXT_PUBLIC_APP_NAME,
      APP_PRIVATE_POLICY_URL: process.env.NUXT_PUBLIC_APP_PRIVATE_POLICY_URL,
      AUTHOR_LINK: process.env.NUXT_PUBLIC_AUTHOR_LINK,
      AUTHOR_NAME: process.env.NUXT_PUBLIC_AUTHOR_NAME,
      BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
      COMPANY_ADDRESS: process.env.NUXT_PUBLIC_COMPANY_ADDRESS,
      COMPANY_NAME: process.env.NUXT_PUBLIC_COMPANY_NAME,
      COMPANY_TAX_CODE: process.env.NUXT_PUBLIC_COMPANY_TAX_CODE,
      CUSTOMER_CARE_MAIL: process.env.NUXT_PUBLIC_CUSTOMER_CARE_MAIL,
      CUSTOMER_CARE_PHONE: process.env.NUXT_PUBLIC_CUSTOMER_CARE_PHONE,
      CUSTOMER_CARE_PHONE_FORMAT: process.env.NUXT_PUBLIC_CUSTOMER_CARE_PHONE_FORMAT,
      FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
      FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
      FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.NUXT_FIREBASE_DATABASE_URL,
      FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      GOV_REGISTER_DATE: process.env.NUXT_PUBLIC_GOV_REGISTER_DATE,
      GOV_REGISTER_URL: process.env.NUXT_PUBLIC_GOV_REGISTER_URL,
      META_CONTENT: process.env.NUXT_PUBLIC_META_CONTENT,
      META_DESCRIPTION: process.env.NUXT_PUBLIC_META_DESCRIPTION,
      META_IMAGE: process.env.NUXT_PUBLIC_META_IMAGE,
      META_KEYWORDS: process.env.NUXT_PUBLIC_META_KEYWORDS,
      META_TITLE: process.env.NUXT_PUBLIC_META_TITLE,
      THE_LEGAL_REPRESENTATION: process.env.NUXT_PUBLIC_THE_LEGAL_REPRESENTATION,
    },
  },

  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,

    // FIXME: https://github.com/nuxt/nuxt/issues/20060
    typeCheck: true,
  },

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
    ssr: {
      noExternal: ['v-viewer'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        hostname: '0.0.0.0',
        open: false,
        port: 4000,
      },
    },
    scan: true,
  },
});
