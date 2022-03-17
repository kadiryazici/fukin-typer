import { allowedCharsArray } from '../constants';

export function isValidChar(char: string) {
   if (char.length > 1) return false;
   return allowedCharsArray.includes(char);
}
