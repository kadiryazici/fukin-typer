import { isRepeating } from '/src/helpers/isRepeating';
import { isValidChar } from '/src/helpers/isValidChar';
import { runInputHooks } from '/src/composables/hooks';

export function setupKeyboardHandling() {
   window.addEventListener('keydown', (e) => {
      const char = e.key.toLowerCase();
      if (isRepeating(e) || !isValidChar(char) || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
      e.preventDefault();
      runInputHooks(char);
   });
}
