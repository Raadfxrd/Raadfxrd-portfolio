<template>
  <NuxtLayout>
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </NuxtLayout>
</template>

<script setup lang="ts">
import AppHeader from "~/layouts/AppHeader.vue";
import AppFooter from "~/layouts/AppFooter.vue";
</script>