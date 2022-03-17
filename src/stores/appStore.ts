import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('AppStore', () => {
   const inputText = ref('');

   return {
      inputText,
   };
});
