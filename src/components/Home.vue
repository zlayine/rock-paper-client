<template>
  <div class="sm:w-2/3 mx-auto h-full flex flex-col overflow-hidden">
    <!-- <div
      class="absolute sm:top-5 sm:left-5 bottom-5 sm:bottom-auto w-full flex sm:block"
    >
      <button
        class="mx-auto bg-white text-gray-800 rounded-md text-sm font-semibold px-2 py-1 cursor-pointer"
        @click="disconnect"
      >
        Disconnect
      </button>
    </div> -->
    <Navbar :myScore="myScore" :playerScore="playerScore" />
    <div class="relative h-full">
      <TransitionGroup name="slide">
        <InviteFriend key="0" v-if="step === 0" @join="joinChannel" />

        <div
          v-if="step === 1"
          key="1"
          class="w-full h-full m-auto flex flex-col justify-center"
        >
          <div class="flex flex-col md:flex-row gap-4 mx-0">
            <template v-for="(image, action) in items" :key="action">
              <ItemPlay :image="image" :action="action" @play="play" />
            </template>
          </div>
        </div>

        <div
          v-if="step === 2"
          key="2"
          class="w-full h-full m-auto flex flex-col justify-center"
        >
          <div class="flex flex-col md:flex-row gap-10 my-auto justify-between">
            <div class="flex flex-col gap-4">
              <div class="text-white font-bold text-lg text-center uppercase">
                You picked
              </div>
              <ItemPlay :image="items[myChoice]" :action="myChoice" />
            </div>

            <Transition name="slide-up" appear>
              <Results v-if="showResult" :status="status" @again="playAgain" />
            </Transition>

            <div class="flex flex-col gap-4">
              <div class="text-white font-bold text-lg text-center uppercase">
                <span v-if="playerChoice">Player picked</span>
                <span v-else>The player is picking</span>
              </div>
              <ItemPlay :image="items[playerChoice]" :action="playerChoice" />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ItemPlay from '@/components/ItemPlay.vue';
import Navbar from '@/components/Navbar.vue';
import InviteFriend from '@/components/InviteFriend.vue';
import Results from '@/components/Results.vue';
import SocketioService from '@/services/socketio';
import { useRoute } from 'vue-router';

const route = useRoute();

const myScore = ref(0);
const playerScore = ref(0);

const items = {
  paper: './src/assets/icon-paper.svg',
  rock: './src/assets/icon-rock.svg',
  scissors: './src/assets/icon-scissors.svg',
};

const myChoice = ref();
const playerChoice = ref();
const step = ref(0);
const status = ref(0);

const showResult = computed(() => myChoice.value && playerChoice.value);

const play = (choice: string) => {
  myChoice.value = choice;
  step.value = 2;
  SocketioService.sendChoice(choice);
  finish();
};

const finish = () => {
  if (!myChoice.value || !playerChoice.value) {
    return;
  }

  if (myChoice.value === playerChoice.value) {
    status.value = 0;
  } else if (
    (myChoice.value === 'rock' && playerChoice.value === 'scissors') ||
    (myChoice.value === 'paper' && playerChoice.value === 'rock') ||
    (myChoice.value === 'scissors' && playerChoice.value === 'paper')
  ) {
    myScore.value += 1;
    status.value = 1;
  } else {
    playerScore.value += 1;
    status.value = 2;
  }
  step.value = 2;
};

const playAgain = () => {
  resetValues();
  SocketioService.playAgain();
};

const resetValues = () => {
  step.value = 1;
  status.value = 0;
  playerChoice.value = '';
  myChoice.value = '';
};

const initSocket = async () => {
  await SocketioService.init();

  SocketioService.onChoiceMade((choice: string) => {
    playerChoice.value = choice;
    finish();
  });

  SocketioService.onUserConnected(() => {
    step.value = 1;
    SocketioService.readyToPlay();
  });

  SocketioService.onReady(() => {
    step.value = 1;
  });

  SocketioService.onPlayAgain(() => {
    resetValues();
  });

  SocketioService.onLeaveChannel(() => {
    resetValues();
    step.value = 0;
  });
};

const joinChannel = () => {
  SocketioService.joinChannel(route.params.id.toString());
};

const disconnect = () => {
  SocketioService.leaveChannel();
  resetValues();
  step.value = 0;
};

(async () => {
  initSocket();
})();
</script>
