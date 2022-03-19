import { words } from '/src/store';

export function hasWord(word: string) {
   return words.value.findIndex((_word) => _word.word === word) >= 0;
}
