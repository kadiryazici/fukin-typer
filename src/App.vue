<script setup lang="ts">
import { runInputHooks, onInput } from '/src/helpers/useInput';
import { useEventListener } from '@vueuse/core';
import { isValidChar } from '/src/helpers/isValidChar';
import { isRepeating } from '/src/helpers/isRepeating';
import { currentWords } from '/src/store';
import { saveChar } from '/src/helpers/saveChar';
import { onMounted } from 'vue';
import { pickRandomWord } from '/src/helpers/pickRandomWord';
import Word from '/src/components/Word.vue';
import { onWordMatch } from '/src/helpers/wordMatch';

onWordMatch((word) => {
   const index = currentWords.value.indexOf(word);
   currentWords.value.splice(index, 1);
});

onInput((key) => {
   console.log(key);
});

useEventListener('keydown', (e) => {
   const char = e.key.toLowerCase();
   if (isRepeating(e) || !isValidChar(char) || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
   e.preventDefault();
   runInputHooks(char);
   saveChar(char);
});

onMounted(() => {
   setInterval(() => {
      currentWords.value.push(pickRandomWord());
   }, 1000);
});
</script>

<template>
   <ul>
      <Word :word="word" :key="word" v-for="word in currentWords" />
   </ul>
</template>
