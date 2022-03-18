<script lang="ts" setup>
import { onInput } from '/src/composables/useInput';
import { runWordMatchHooks } from '/src/composables/wordMatch';
import { resettableRef } from '/src/composables/resettableRef';

interface Props {
   word: string;
}
const props = defineProps<Props>();

const [matchArray, resetMatchArray] = resettableRef<boolean[]>(() => Array(props.word.length).fill(false));

onInput((char) => {
   const charIndex = matchArray.value.indexOf(false);
   if (charIndex === -1) return;

   const wordChar = props.word[charIndex];

   if (wordChar && char === wordChar) matchArray.value[charIndex] = true;
   else return resetMatchArray();

   if (matchArray.value.every(Boolean)) {
      runWordMatchHooks(props.word);
   }
});
</script>

<template>
   <li>
      <span :class="{ matching }" v-for="(matching, index) in matchArray">{{ props.word[index] }}</span>
   </li>
</template>

<style lang="scss" scoped>
.matching {
   color: blue;
   font-weight: bold;
}
</style>
