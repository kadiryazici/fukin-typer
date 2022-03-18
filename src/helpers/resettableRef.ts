import { Ref, ref } from 'vue';

export function resettableRef<T>(creator: () => T): [Ref<T>, () => void] {
   const val = ref<T>(creator()) as Ref<T>;
   const reset = () => {
      val.value = creator();
   };

   return [val, reset];
}
