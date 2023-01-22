<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    const id = route.params.id;
    const random = Math.random().toString(36).substring(2, 10);
    if (!id) {
      router.push({ name: 'home', params: { id: random } });
    }
  }, 100);
});
</script>
