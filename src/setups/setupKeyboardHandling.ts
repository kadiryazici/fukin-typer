import { GameStatus, gameStatus } from '/src/store';

import { isRepeating } from '/src/helpers/isRepeating';
import { isValidChar } from '/src/helpers/isValidChar';
import { runInputHooks } from '/src/composables/hooks';

export function setupKeyboardHandling() {
   window.addEventListener('keydown', (e) => {
      if (gameStatus.value === GameStatus.Stopped || gameStatus.value === GameStatus.Over) return;

      const char = e.key.toLowerCase();
      if (isRepeating(e) || !isValidChar(char) || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
      runInputHooks(char);
   });
}
