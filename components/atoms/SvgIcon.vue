<script setup lang="ts">
export type Props = {
  name: string;
};
const props = defineProps<Props>();

const name = toRef(props, 'name');
watch(name, loadIcon);

const icon = ref<string>();

await loadIcon();

async function loadIcon() {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', { as: 'raw', eager: false });
    const rawIcon = await iconsImport[`/assets/icons/${name.value}.svg`]();
    icon.value = rawIcon;
  } catch {
    logger('error', `[svg-icons] Icon '${name.value}' doesn't exist in 'assets/icons'`);
  }
}
</script>

<template>
  <span v-if="icon" class="wd-inline-flex wd-h-min wd-w-min" v-html="icon"></span>
</template>
