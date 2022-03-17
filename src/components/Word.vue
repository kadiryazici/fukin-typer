<script lang="ts" setup>
import { ref } from 'vue';
import { onInput } from '/src/helpers/useInput';
import { runWordMatchHooks } from '/src/helpers/wordMatch';

interface Props {
   word: string;
}
const props = defineProps<Props>();

const matchArray = ref<boolean[]>(Array(props.word.length).fill(false));

onInput((char) => {
   const charIndex = matchArray.value.indexOf(false);
   if (charIndex === -1) return;

   const wordChar = props.word.charAt(charIndex);
   if (wordChar && char === wordChar) {
      matchArray.value[charIndex] = true;
   } else {
      matchArray.value = Array(props.word.length).fill(false);
   }

   if (matchArray.value.every(Boolean)) {
      runWordMatchHooks(props.word);
   }
});
</script>

<template>
   <li>
      <span :class="{ matching }" v-for="(matching, index) in matchArray">{{ props.word.charAt(index) }}</span>
   </li>
</template>

<style lang="scss" scoped>
.matching {
   color: blue;
   font-weight: bold;
}
</style>
