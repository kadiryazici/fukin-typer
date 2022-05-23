import { SoundTypes, sounds } from '/src/constants/sound';

export function playSound(sound: SoundTypes, volume = 1) {
   const audio = new Audio(sounds[sound]);
   audio.volume = volume;
   audio.play();
}
