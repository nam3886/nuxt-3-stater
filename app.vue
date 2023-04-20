<script lang="ts" setup>
import { appGlobalConfig } from '~/configs/app.global';

appGlobalConfig();

useMetaTag();

const { systemTheme } = useTheme();
const { localeUserSetting } = useLang();
</script>

<template>
  <Html :class="{ dark: systemTheme === 'dark' }" :lang="localeUserSetting">
    <Body
      class="wd-antialiased wd-duration-300 wd-transition-colors wd-text-secondary dark:wd-text-gray-200 wd-bg-[#F3F5F9] dark:wd-bg-gray-900"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
