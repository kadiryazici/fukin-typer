<script lang="ts" setup>
import { playSound, Sounds } from '/src/helpers/playSound';
import { GameStatus, gameStatus, savedChars } from '/src/store';
import { onInput, onKeyPress } from '/src/composables/hooks';

onInput((char) => {
   savedChars.value.push(char);
   playSound(Sounds.Typing, 0.1);
});

onKeyPress(
   'Backspace',
   (e) => {
      if (e.ctrlKey) {
         e.preventDefault();
         savedChars.value.length = 0;
         return;
      }
      savedChars.value.pop();
   },
   { repeat: true },
);
</script>

<template>
   <button @click="gameStatus = GameStatus.Stopped">Stop</button>
   <button @click="gameStatus = GameStatus.Running">Start</button>
   <div class="_user-area">
      <TransitionGroup enterActiveClass="_char_enter" leaveActiveClass="_char_leave">
         <span v-for="(char, index) in savedChars" :key="char + index" class="_char">{{ char }}</span>
      </TransitionGroup>
   </div>
</template>

<style lang="scss" scoped>
._user-area {
   flex-grow: 1;
   flex-flow: row wrap;
   align-content: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   padding: 25px;
}

._char {
   font-size: 50px;
   color: black;
   display: inline-block;
}

._char_enter {
   animation: _word_popup 0.1s linear;
}
._char_leave {
   animation: _word_popup 0.1s linear reverse;
}

@keyframes _word_popup {
   0% {
      transform: scale(0.8);
   }
   80% {
      transform: scale(1.3);
   }
   100% {
      transform: scale(1);
   }
}
</style>
