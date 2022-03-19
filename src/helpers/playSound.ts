import TypingSound from '/src/assets/typing.mp3';

export enum Sounds {
   Typing,
}

const sounds = Object.freeze({
   [Sounds.Typing]: TypingSound,
});

export function playSound(sound: Sounds, volume = 1) {
   const audio = new Audio(sounds[sound]);
   audio.volume = volume;
   audio.play();
}
