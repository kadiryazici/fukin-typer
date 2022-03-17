import { currentWords } from '/src/store';
import words from '/src/constants/words';

export function pickRandomWord(): string {
   const index = Math.floor(Math.random() * words.length);
   if (currentWords.value.includes(words[index])) {
      return pickRandomWord();
   }
   return words[index];
}
