<script setup lang="ts">
import { setupKeyboardHandling } from '/src/setups/setupKeyboardHandling';
import { setupGameLoop } from '/src/setups/setupGameLoop';
import UserArea from './components/UserArea.vue';
import { createEnemy } from '/src/helpers/createEnemy';
import Enemies from '/src/components/Enemies.vue';
import { watch } from 'vue';
import { savedChars, userInput } from '/src/store';
import { onInterval, onKeyPress, onWordMatch, runCharsChangeHook, runSubmitHooks } from '/src/composables/hooks';
import { killEnemy } from '/src/helpers/killEnemy';

onInterval(2000, () => createEnemy());
onKeyPress('Enter', () => {
   runSubmitHooks(userInput.value);
   savedChars.value = [];
});

onWordMatch((word) => {
   killEnemy(word);
});

watch(savedChars, runCharsChangeHook, { deep: true });

setupKeyboardHandling();
setupGameLoop();
</script>

<template>
   <UserArea />
   <Enemies />
</template>
