<script lang="ts" setup>
import { playSound, Sounds } from '/src/helpers/playSound';
import { GameStatus, gameStatus, savedChars } from '/src/store';
import { onInput } from '/src/composables/hooks';

import PlayIcon from 'virtual:icons/ph/play-fill';
import PauseIcon from 'virtual:icons/ph/pause-fill';
import { toggleGameStatus } from '/src/helpers/toggleGameStatus';
import { useKey } from '../composables/useKey';

onInput((char) => {
   if (gameStatus.value === GameStatus.WaitingToStart) {
      gameStatus.value = GameStatus.Running;
   }

   savedChars.value.push(char);
   playSound(Sounds.Typing, 0.1);
});

useKey(
   'backspace',
   () => {
      if (gameStatus.value === GameStatus.Stopped || gameStatus.value === GameStatus.Over) return;
      savedChars.value.pop();
   },
   { repeat: true },
);

useKey(
   'ctrl+backspace,command+backspace',
   () => {
      if (gameStatus.value === GameStatus.Stopped || gameStatus.value === GameStatus.Over) return;

      savedChars.value.length = 0;
   },
   { prevent: true },
);
useKey('ctrl+p,command+p', toggleGameStatus, { prevent: true });
</script>

<template>
   <div class="_typing_area">
      <div class="_head">
         <button @click="gameStatus = gameStatus === GameStatus.Running ? GameStatus.Stopped : GameStatus.Running">
            <Transition mode="out-in" enterActiveClass="_char_enter" leaveActiveClass="_char_leave">
               <PlayIcon v-if="gameStatus !== GameStatus.Running" />
               <PauseIcon v-else />
            </Transition>
         </button>
      </div>

      <div class="_user-area">
         <div v-if="savedChars.length === 0 && gameStatus === GameStatus.WaitingToStart" class="_placeholder">
            Type to start
         </div>

         <TransitionGroup enterActiveClass="_char_enter" leaveActiveClass="_char_leave">
            <span v-for="(char, index) in savedChars" :key="char + index" class="_char">{{ char }}</span>
         </TransitionGroup>
      </div>
   </div>
</template>

<style lang="scss" scoped>
$accent: rgb(121 66 240 / 1);

._typing_area {
   display: flex;
   flex-flow: column nowrap;
   flex-grow: 0;
   width: 100%;
   height: 100%;
   position: relative;

   ._head {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      padding: 10px;
      gap: 10px;

      button {
         display: flex;
         flex-flow: row nowrap;
         align-items: center;
         justify-content: center;
         width: 35px;
         height: 35px;
         border: 0;
         outline: none;
         background-color: $accent;
         border-radius: 5px;
         color: white;
         cursor: pointer;
         box-shadow: 0px 4px 4px -4px rgb(0 0 0 / 0);
         transition: all 0.3s;
         border: 1px solid transparent;

         &:hover {
            box-shadow: 0px 4px 4px -4px rgb(0 0 0 / 0.2);
            background-color: white;
            border-color: $accent;
            color: $accent;
         }
      }
   }

   ._user-area {
      display: inline-flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-content: center;
      align-items: center;
      padding: 25px;
      flex-flow: row wrap;

      ._placeholder {
         color: rgb(94, 94, 94);
         font-size: 20px;
      }

      ._char {
         font-size: 50px;
         color: black;
         display: inline-block;
      }
   }
}

._char_enter {
   animation: _word_popup 0.1s linear;
}
._char_leave {
   animation: _word_popup 0.1s linear reverse;
}
</style>
