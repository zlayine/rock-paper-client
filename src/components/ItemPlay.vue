<template>
  <div
    class="rounded-full w-[150px] h-[150px] flex cursor-pointer shadow-md bg-white border-[12px] border-blue-900 mx-auto"
  >
    <div v-if="!action" class="empty"></div>
    <div
      v-else
      class="w-full h-full rounded-full flex"
      @click="emit('play', action)"
    >
      <img class="m-auto" :src="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image?: string;
  action?: string;
}>();

const emit = defineEmits(['play']);
</script>
