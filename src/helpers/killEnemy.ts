import { words } from '/src/store';

export function killEnemy(word: string) {
   const index = words.value.findIndex((_word) => _word.word === word);
   if (index >= 0) {
      words.value.splice(index, 1);
   }
}
