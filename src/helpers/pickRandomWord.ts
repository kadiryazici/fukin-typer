import { hasWord } from '/src/helpers/hasWord';
import words from '/src/constants/words';

export function pickRandomWord(): string {
   const index = Math.floor(Math.random() * words.length);
   if (hasWord(words[index])) {
      return pickRandomWord();
   }
   return words[index];
}
