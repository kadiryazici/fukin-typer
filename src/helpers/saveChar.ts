import { savedCharLimit } from '/src/constants';
import { savedChars } from '/src/store';

export function saveChar(char: string) {
   savedChars.value.push(char);
   if (savedChars.value.length > savedCharLimit) {
      savedChars.value = savedChars.value.slice(-savedCharLimit);
   }
}
