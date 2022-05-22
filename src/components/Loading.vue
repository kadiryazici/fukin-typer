<script
   lang="ts"
   setup
>
import { onMounted } from 'vue';
import { sounds, SoundTypes } from '../helpers/playSound';
import TypingSound from '/src/assets/typing.mp3';

interface Emits {
   (e: 'loaded'): void;
}

const emit = defineEmits<Emits>();

const getLoadSoundPromises = () => {
   const soundMap: [SoundTypes, string][] = [
      [SoundTypes.Typing, TypingSound], //
   ];

   return soundMap.map(([type, url]) =>
      (async () => {
         const response = await fetch(url);
         const soundBlob = await response.blob();
         sounds[type] = URL.createObjectURL(soundBlob);

         console.log(sounds[type]);
      })(),
   );
};

const handleLoad = async () => {
   const promises = [...getLoadSoundPromises()];

   await Promise.all(promises);

   // make it at least 1 second to prevent flashy view
   setTimeout(() => {
      emit('loaded');
   }, 1000);
};

onMounted(handleLoad);
</script>

<template>
   <div class="_loading">Loading Assets...</div>
</template>

<style
   lang="scss"
   scoped
>
._loading {
   position: fixed;
   width: 100%;
   height: 100%;
   left: 0;
   top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 60px;
   z-index: 100;
   background-color: white;
}
</style>
