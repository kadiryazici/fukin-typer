<script setup lang="ts">
import { setupKeyboardHandling } from '/src/setups/setupKeyboardHandling';
import { setupGameLoop } from '/src/setups/setupGameLoop';
import UserArea from './components/UserArea.vue';
import { createEnemy } from '/src/helpers/createEnemy';
import Enemies from '/src/components/Enemies.vue';
import { watch } from 'vue';
import { GameStatus, gameStatus, savedChars, userInput } from '/src/store';
import { onInterval, onKeyPress, onWordMatch, runCharsChangeHook, runSubmitHooks } from '/src/composables/hooks';
import { killEnemy } from '/src/helpers/killEnemy';
import Modal from '/src/components/Modal/index.vue';

onWordMatch(killEnemy);
onInterval(2000, () => createEnemy());
onKeyPress('Enter', () => {
   if (gameStatus.value !== GameStatus.Running) return;

   runSubmitHooks(userInput.value);
   savedChars.value = [];
});

watch(savedChars, runCharsChangeHook, { deep: true });

setupKeyboardHandling();
setupGameLoop();
</script>

<template>
   <Modal :modelValue="gameStatus === GameStatus.Stopped" @update:modelValue="gameStatus = GameStatus.Running">
      <div class="stop-modal">Stopped</div>
   </Modal>
   <UserArea />
   <Enemies />
</template>
