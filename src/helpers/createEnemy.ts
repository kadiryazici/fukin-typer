import { nanoid } from 'nanoid';
import { pickRandomWord } from '/src/helpers/pickRandomWord';
import { words } from '/src/store';

const createRandomPosition = () => Math.floor(Math.random() * (90 - 10) + 10);

export function createEnemy() {
   const word = pickRandomWord();

   words.value.push({
      id: nanoid(),
      progress: 100,
      speed: 1,
      word,
      x: createRandomPosition(),
      y: createRandomPosition(),
   });
}
