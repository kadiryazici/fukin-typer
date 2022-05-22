<script
   lang="ts"
   setup
>
import Enemy from '/src/components/Enemy.vue';
import { words } from '/src/store';
</script>

<template>
   <div class="_enemy-area">
      <Enemy
         :position="{ x, y }"
         :word="word"
         :key="id"
         v-for="{ word, id, x, y } in words"
      />
   </div>
</template>

<style
   lang="scss"
   scoped
>
._enemy-area {
   width: 65%;
   flex-shrink: 0;
   background-color: rgb(240 240 240 / 1);
   height: 100%;
   position: relative;
}
</style>
