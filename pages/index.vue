<script lang="ts" setup>
const { systemTheme, themeUserSetting } = useTheme();
</script>

<template>
  <PageWrapper>
    {{ systemTheme }}
    <br />
    {{ themeUserSetting }}
    <br />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolorum pariatur ex vero odit fuga
    ea suscipit, vel corporis aliquid reprehenderit ad odio minima animi exercitationem quod
    accusamus inventore. Doloremque.
  </PageWrapper>
</template>
