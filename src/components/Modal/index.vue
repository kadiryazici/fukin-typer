<script lang="ts" setup>
interface Props {
   modelValue: boolean;
}
interface Emits {
   (e: 'update:modelValue', v: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const setVisibility = (visibility: boolean) => {
   emit('update:modelValue', visibility);
};
</script>

<template>
   <Teleport to="body">
      <Transition enterActiveClass="_modal-in" leaveActiveClass="_modal-out">
         <div v-if="props.modelValue" @click.self.stop="setVisibility(false)" class="_modal-backdrop">
            <div class="_modal">
               <slot />
            </div>
         </div>
      </Transition>
   </Teleport>
</template>

<style lang="scss" scoped>
._modal-backdrop {
   background-color: rgb(0 0 0 / 0.4);
   display: flex;
   position: fixed;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   left: 0;
   top: 0;

   ._modal {
      padding: 10px;
      margin: 10px;
      width: 100%;
      max-width: 700px;
      min-height: 300px;
      display: flex;
   }
}

._modal-in {
   animation: _modal_in 0.15s;
}

._modal-out {
   animation: _modal_in 0.15s reverse;
}

@keyframes _modal_in {
   0% {
      transform: scale(1.3);
      opacity: 0;
   }

   100% {
      transform: scale(1);
      opacity: 1;
   }
}
</style>
