import hotkeys, { type HotkeysEvent } from 'hotkeys-js';
import { type ComputedRef, getCurrentScope, onMounted, onScopeDispose, type Ref, watch } from 'vue';

type UseKeyHandler = (event: KeyboardEvent, hotkeysEvent: HotkeysEvent) => void;

interface Options {
   input?: boolean;
   prevent?: boolean;
   repeat?: boolean;
   stop?: boolean;
   source?: Ref<boolean> | ComputedRef<boolean> | (() => boolean);
}

const isTyping = () =>
   document.activeElement instanceof HTMLTextAreaElement ||
   document.activeElement instanceof HTMLInputElement ||
   document.activeElement?.hasAttribute('contenteditable');

// It allows events to run in the (input, textarea) as well.
hotkeys.filter = () => true;

const bindings = Object.create(null) as {
   [key: string]: UseKeyHandler[];
};

const getLastElement = <T>(arr: T[]) => arr[arr.length - 1];

export function useKey(
   shortcuts: string,
   eventHandler: UseKeyHandler,
   { input = false, prevent = false, stop = false, repeat = false, source }: Options = {},
) {
   let inited = false;
   let destroyed = false;

   const keys = shortcuts.split(',').map((shortcut) => shortcut.trim());

   const handler = (event: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
      if ((!input && isTyping()) || (!repeat && event.repeat)) return;

      if (prevent) event.preventDefault();
      if (stop) event.stopPropagation();

      eventHandler(event, hotkeysEvent);
   };

   const init = () => {
      if (inited && !destroyed) return;

      destroyed = false;
      inited = true;

      keys.forEach((key) => {
         if (bindings[key]) bindings[key].push(handler);
         else {
            bindings[key] = [handler];
            hotkeys(key, (...args) => getLastElement(bindings[key])(...args));
         }
      });
   };

   const destroy = () => {
      if (destroyed && !inited) return;

      destroyed = true;
      inited = false;

      keys.forEach(($key) => {
         if (!bindings[$key]) return;

         bindings[$key] = bindings[$key].filter((binded) => binded !== handler);
         if (bindings[$key].length === 0) {
            delete bindings[$key];
            hotkeys.unbind($key);
         }
      });
   };

   if (source) {
      watch(
         source,
         (value) => {
            if (value) init();
            else destroy();
         },
         { immediate: true },
      );
   } else {
      onMounted(init);
   }

   if (getCurrentScope()) onScopeDispose(destroy);
}
