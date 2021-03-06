import { Card, Deck } from './types';

function validate(parts: string[]): boolean {
  if (parts.length < 2) {
    return false;
  }

  if (!parts[0].match(/^[0-9]+$/)) {
    return false;
  }

  return true;
}

export function parseCard(text: string): Card {
  const parts = text.split(' ');

  if (!validate(parts)) {
    //TODO: declear
    throw new Error('invalid format');
  }

  const qty = Number(parts[0]);
  const name = parts.slice(1).join(' ');

  return { name, qty };
}

export function parseDeck(text: string): Deck {
  const main: Card[] = [];
  const side: Card[] = [];
  let isHead = true;
  let cards: Card[] | undefined;

  for (const line of text.split('\n')) {
    if (isHead) {
      isHead = false;
      if (cards === undefined) {
        cards = main;
      } else {
        cards = side;
      }
      continue;
    }

    if (!line) {
      isHead = true;
      continue;
    }

    const card = parseCard(line);
    cards?.push(card);
  }

  return { main, side };
}

export function dumpDeck(deck: Deck): string {
  let str = `Deck
${deck.main
    .map((x) => {
      return x.qty + ' ' + x.name;
    })
    .join('\n')}
`;

  if (deck.side.length > 0) {
    str +=
      `
Sideboard
${deck.side
        .map((x) => {
          return x.qty + ' ' + x.name;
        })
        .join('\n')}
`;
  }

  return str;
}
