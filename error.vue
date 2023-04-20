<script lang="ts" setup>
import type { NuxtError } from '#app';
import { appGlobalConfig } from '~/configs/app.global';

export type Props = {
  error: string | Partial<NuxtError>;
};
const props = defineProps<Props>();

appGlobalConfig();

useMetaTag();

const { systemTheme } = useTheme();
const { localeUserSetting } = useLang();

const errorMessage = computed(() => {
  return useIsString(props.error) ? props.error : props.error.statusMessage || props.error.message;
});

const errorStack = computed(() => {
  return !useIsString(props.error) ? props.error.stack : undefined;
});
</script>

<template>
  <Html :class="`${systemTheme === 'dark' ? 'dark' : ''}`" :lang="localeUserSetting">
    <Body
      class="wd-antialiased wd-duration-300 wd-transition-colors wd-text-secondary dark:wd-text-gray-200 wd-bg-[#F3F5F9] dark:wd-bg-gray-900"
    >
      {{ errorMessage }}
      <br />
      {{ errorStack }}
    </Body>
  </Html>
</template>
