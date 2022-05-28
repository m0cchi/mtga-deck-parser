import { parseCard, parseDeck } from './index';
import { readFileSync } from 'fs';
import * as path from 'path';

test(
  'parseCard en',
  () => {
    const card = parseCard('3 Kaito Shizuki');
    expect(card.qty).toBe(3);
    expect(card.name).toBe('Kaito Shizuki');
  },
);

test(
  'parseCard jp',
  () => {
    const card = parseCard('4 策謀の予見者、ラフィーン ex');
    expect(card.qty).toBe(4);
    expect(card.name).toBe('策謀の予見者、ラフィーン ex');
  },
);

test(
  'parseDeck en',
  () => {
    const deckText = readFileSync(
      path.resolve(__dirname, '../', 'assets/testdata/deck001.txt'),
    );
    const deck = parseDeck(deckText.toString());
    expect(deck.main[0].name).toBe('Plains');
    expect(deck.main[0].qty).toBe(8);
    expect(deck.main[deck.main.length - 1].name).toBe('Sanctuary Warden');
    expect(deck.main[deck.main.length - 1].qty).toBe(2);

    expect(deck.side[0].name).toBe('Legion Angel');
    expect(deck.side[0].qty).toBe(3);
    expect(deck.side[deck.side.length - 1].name).toBe('Boon of Safety');
    expect(deck.side[deck.side.length - 1].qty).toBe(2);
  },
);

test(
  'parseDeck en non-sideboard',
  () => {
    const deckText = readFileSync(
      path.resolve(__dirname, '../', 'assets/testdata/deck002.txt'),
    );
    const deck = parseDeck(deckText.toString());
    expect(deck.main[0].name).toBe('Plains');
    expect(deck.main[0].qty).toBe(8);
    expect(deck.main[deck.main.length - 1].name).toBe('Sanctuary Warden');
    expect(deck.main[deck.main.length - 1].qty).toBe(2);

    expect(deck.side.length).toBe(0);
  },
);
