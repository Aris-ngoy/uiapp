import { Item } from "../models/item";

export const Items : Item[] = [
    {
        title: 'Hold to reveal',
        route: '(dashboard)/reveal'
    },
    {
        title: 'Animated Number',
        route: '(dashboard)/numbers'
    },
    {
        title: 'Animated scroll',
        route: '(dashboard)/scroll'
    },
    {
        title: 'Animated Text Input',
        route: '(dashboard)/textinput'
    },
    {
        title: 'Animated Cards',
        route: '(dashboard)/cards'
    },
    {
        title: 'Animated Expanded',
        route: '(dashboard)/expanded'
    },
    {
        title: 'Animated List View',
        route: '(dashboard)/listview'
    }
]


//south africa zar
export const formatter = new Intl.NumberFormat('en-ZA');

export const getKey = (formattedIndex: number, original: number) => {
  const formatted = formatter.format(original);
  // if a dot, do nothing
  if (formatted[formattedIndex] === '.') return `.-${formattedIndex}`;
  // find the index of the digit in the original number
  let index = 0;
  for (let i = 0; i < formattedIndex; i++) {
    if (formatted[i] === '.') continue;
    index++;
  }
  return index;
};