<template>
  <div class="w-full h-full m-auto flex flex-col justify-center">
    <div class="flex justify-center">
      <Transition name="fade" mode="out-in">
        <div v-if="!joining" class="flex flex-col justify-center">
          <!-- <p class="text-white text-xl mb-2 text-center">Hoşgeldınn aşkımm</p> -->
          <button
            class="mx-auto bg-white text-gray-800 rounded-md font-semibold px-4 py-3"
            @click="join"
          >
            Join Channel
          </button>
        </div>

        <p v-else class="text-white text-center text-xl sm:text-4xl">
          Waiting for your friend...
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['join']);

const joining = ref(false);

const join = () => {
  joining.value = true;
  emit('join');
};
</script>
