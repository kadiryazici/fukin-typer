import { getCurrentScope, onScopeDispose } from 'vue';

export function createHookStore<H extends (...args: any[]) => void>() {
   let hooks = [] as H[];

   const runHooks = (...args: Parameters<H>) => {
      for (const hook of hooks) {
         hook(...args);
      }
   };

   const saveHook = (hook: H) => {
      hooks.push(hook);
   };

   const removeHook = (hook: H) => {
      hooks = hooks.filter((h) => h !== hook);
   };

   const createHookComposable = () => (hook: H) => {
      saveHook(hook);
      if (getCurrentScope()) onScopeDispose(() => removeHook(hook));

      return () => removeHook(hook);
   };

   return {
      runHooks,
      saveHook,
      removeHook,
      createHookComposable,
   };
}
