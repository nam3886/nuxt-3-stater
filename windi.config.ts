import defaultTheme from 'windicss/defaultTheme';
import { defineConfig } from 'windicss/helpers';
import AspectRatioPlugin from 'windicss/plugin/aspect-ratio';
import FiltersPlugin from 'windicss/plugin/filters';
import TypographyPlugin from 'windicss/plugin/typography';
import type { Plugin } from 'windicss/types/interfaces';

// eslint-disable-next-line no-restricted-imports
import { windiCssTheme } from './constants/theme';

export default defineConfig({
  attributify: false,
  darkMode: 'class',
  extract: {
    include: [
      './components/**/*.{vue,js}',
      './composables/**/*.{js,ts}',
      './content/**/*.md',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './utils/**/*.{js,ts}',
      './app.vue',
    ],
  },
  plugins: [
    // filters plugin require for navbar blur
    FiltersPlugin as Plugin,
    TypographyPlugin as Plugin,
    AspectRatioPlugin as Plugin,
  ] as Plugin[],
  prefix: 'wd-',
  shortcuts: {
    'dark-img': 'hidden dark:block',
    'light-img': 'block dark:hidden',
  },
  theme: {
    extend: {
      colors: {
        ...windiCssTheme.colors,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      screens: {
        '2xl': '2560px',
        lg: '1280px',
        md: '960px',
        sm: '600px',
        xl: '1920px',
        xs: '0',
      },
    },
  },
});
