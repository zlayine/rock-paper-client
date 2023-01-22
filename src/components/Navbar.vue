<template>
  <div
    class="flex flex-col bg-transparent border-4 border-slate-500 rounded-lg sm:w-2/3 p-4 mx-auto mt-5 justify-between"
  >
    <div class="text-white mx-auto text-xl md:text-4xl text-center">
      ROCK PAPER SCISSORS
    </div>
    <div
      class="flex flex-col justify-center rounded-lg p-3 bg-white w-[100px] mx-auto mt-5"
    >
      <div class="text-sm text-blue-900 text-center relative font-semibold">
        SCORE
      </div>
      <div class="text-4xl text-gray-700 text-center font-bold">
        {{ myScore + ' - ' + playerScore }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  myScore: number;
  playerScore: number;
}>();
</script>
