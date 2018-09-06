# NovaBlitz Deckstrings

An unofficial port of Hearthstone's deckstrings for NovaBlitz to make copying and sharing decks easy for players and community members.

## Encoding Scheme

Virtually identical to [Hearthstone's deckstrings](https://hearthsim.info/docs/deckstrings/), a deckstring consists of:

### Header Block
1. Version (1).

### Aspect Block
The first character denotes the number of aspects in the block, the following numbers are the aspects, encoding as 0-4, alphabetically. (eg. Arcane -> 1).

### Card Blocks
There are 3 card blocks:

1. For 1-copy cards.
2. For 2-copy cards.
3. For 3-copy cards.

Each is led by a character indicating the number of cards in the block, and then the cards, each represented by its card id.

Each integer is encoded as a [varint](https://developers.google.com/protocol-buffers/docs/encoding#varints), and then encoded using base-64.

## Implementation

Loose Python and JS implementations are included in this repository.

A browser demo is located [here](https://kajchang.github.io/deckstring).
