<script
   setup
   lang="ts"
>
import { setupKeyboardHandling } from '/src/setups/setupKeyboardHandling';
import { setupGameLoop } from '/src/setups/setupGameLoop';
import UserArea from './components/UserArea.vue';
import { createEnemy } from '/src/helpers/createEnemy';
import Enemies from '/src/components/Enemies.vue';
import { ref, watch } from 'vue';
import { GameStatus, gameStatus, savedChars, userInput } from '/src/store';
import { onInterval, onWordMatch, runCharsChangeHook, runSubmitHooks } from '/src/composables/hooks';
import { killEnemy } from '/src/helpers/killEnemy';
import Modal from '/src/components/Modal/index.vue';
import { useKey } from './composables/useKey';
import Loading from './components/Loading.vue';

const loading = ref(true);

onWordMatch(killEnemy);
onInterval(2000, () => createEnemy());
useKey(
   'enter',
   () => {
      if (gameStatus.value !== GameStatus.Running) return;

      runSubmitHooks(userInput.value);
      savedChars.value = [];
   },
   { prevent: true },
);

watch(savedChars, runCharsChangeHook, { deep: true });

setupKeyboardHandling();
setupGameLoop();
</script>

<template>
   <Transition leaveActiveClass="modal-out">
      <Loading
         v-if="loading"
         @loaded="loading = false"
      />
   </Transition>

   <template v-if="!loading">
      <Modal
         :modelValue="gameStatus === GameStatus.Stopped"
         @update:modelValue="gameStatus = GameStatus.Running"
      >
         <div class="stop-modal">Stopped</div>
      </Modal>
      <UserArea />
      <Enemies />
   </template>
</template>
