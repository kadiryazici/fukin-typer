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

const getRandomUnsinged8 = () => Math.floor(Math.random() * (190 - 80) + 80);
const color = `rgb(${getRandomUnsinged8()}, ${getRandomUnsinged8()}, ${getRandomUnsinged8()})`;

const matchCount = computed(() => matchArray.value.filter(Boolean).length);

const matchPercent = computed(() => {
   return `${1 + ((matchCount.value / props.word.length) * 100) / 400}`;
});

onCharsChange((chars) => {
   resetMatchArray();
   if (chars.length > props.word.length) return;

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
         class="_letter"
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
   color: rgb(24, 24, 24);
   position: absolute;
   left: v-bind('positionStyles.left');
   aspect-ratio: 1/1;
   top: v-bind('positionStyles.top');
   border-radius: 50%;
   background-color: v-bind(color);
   box-shadow: 0px 0px 4px 1px v-bind(color);
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 5px;
   transform: scale(v-bind(matchPercent));
   transition-property: transform;
   transition-duration: 300ms;
   z-index: v-bind(matchCount);
}

.matching {
   color: rgb(255, 255, 255);
}
</style>
