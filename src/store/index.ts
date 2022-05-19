import { computed, ref, shallowRef } from 'vue';
export interface Word {
   word: string;
   speed: number; // 1 is default speed, which means 10 seconds. 2 means 5 seconds .... goes like that.
   progress: number; // 0 to 100. if becomes 100 hits the player.
   id: string;
   x: number;
   y: number;
}

export const enum GameStatus {
   Over,
   Stopped,
   Running,
   WaitingToStart,
}

export const delta = shallowRef(0);
export const frameCount = shallowRef(0);
export const gameStatus = shallowRef(GameStatus.WaitingToStart);
export const savedChars = ref<string[]>([]);
export const userInput = computed(() => savedChars.value.join(''));

export const words = ref<Word[]>([]);
