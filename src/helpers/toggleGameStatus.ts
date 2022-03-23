import { GameStatus, gameStatus } from '/src/store';

export function toggleGameStatus() {
   gameStatus.value = gameStatus.value === GameStatus.Running ? GameStatus.Stopped : GameStatus.Running;
}
