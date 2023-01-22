<template>
  <div class="m-auto flex flex-col text-center relative">
    <div
      class="text-white font-bold text-lg text-center uppercase"
      v-if="status === 2"
    >
      You lose
    </div>
    <div
      class="text-white font-bold text-lg text-center uppercase"
      v-else-if="status === 1"
    >
      You win
    </div>
    <div class="text-white font-bold text-lg text-center uppercase" v-else>
      You tie
    </div>
    <button
      class="bg-white text-gray-800 rounded-md font-semibold px-4 py-3 mt-5"
      @click="emit('again')"
    >
      Play again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: number;
}>();

const emit = defineEmits(['again']);
</script>
