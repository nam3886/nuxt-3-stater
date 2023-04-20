<script lang="ts" setup>
export type Props = {
  readonly loading?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
