export enum SoundTypes {
   Typing,
}

export const sounds = {
   [SoundTypes.Typing]: '',
};

export function playSound(sound: SoundTypes, volume = 1) {
   const audio = new Audio(sounds[sound]);
   audio.volume = volume;
   audio.play();
}
