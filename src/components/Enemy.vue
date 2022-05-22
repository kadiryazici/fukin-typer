<script
   lang="ts"
   setup
>
import { resettableRef } from '/src/composables/resettableRef';
import { onCharsChange, onSubmit, runWordMatchHooks } from '/src/composables/hooks';
import { computed } from 'vue';

interface Props {
   word: string;
   position: {
      x: number;
      y: number;
   };
}
const props = defineProps<Props>();

const positionStyles = computed(() => ({
   left: props.position.x + '%',
   top: props.position.y + '%',
}));
const [matchArray, resetMatchArray] = resettableRef<boolean[]>(() => Array(props.word.length).fill(false));

onCharsChange((chars) => {
   if (chars.length > props.word.length) return resetMatchArray();

   for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const wordChar = props.word[i];

      if (char === wordChar) {
         matchArray.value[i] = true;
      } else {
         resetMatchArray();
         return;
      }
   }
});

onSubmit((text) => {
   if (text === props.word) {
      runWordMatchHooks(props.word);
   }
});
</script>

<template>
   <span class="_word">
      <span
         v-for="(matching, index) in matchArray"
         :key="index"
         :class="{ matching }"
      >
         {{ props.word[index] }}
      </span>
   </span>
</template>

<style
   lang="scss"
   scoped
>
._word {
   position: absolute;
   left: v-bind('positionStyles.left');
   aspect-ratio: 1/1;
   top: v-bind('positionStyles.top');
   border-radius: 50%;
   background-color: white;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 5px;
}
.matching {
   color: blue;
   font-weight: bold;
}
</style>
