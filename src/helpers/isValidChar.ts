import { allowedCharsArray } from '../constants';

export function isValidChar(char: string) {
   if (char.length > 1) return false;
   return char.match(/[\p{L}-]+/gu);
}
