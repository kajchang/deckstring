import base64
import json
from io import BytesIO

with open('../ids.json') as ids_file:
    cards = json.load(ids_file)


# 'Arcane': 0,
# 'Chaos': 1,
# 'Divine': 2,
# 'Nature': 3,
# 'Tech': 4


def card_to_id(card_name):
    for card in cards:
        if ''.join(card['name'].split()).lower() == ''.join(card_name.split()).lower():
            return card['id']


def id_to_card(id_):
    for card in cards:
        if id_ == card['id']:
            return card['name']


# https://github.com/HearthSim/python-hearthstone/blob/master/hearthstone/deckstrings.py
# Copyright (c) Jerome Leclanche

# https://github.com/fmoo/python-varint/blob/master/varint.py


def _read_varint(stream):
    shift = 0
    result = 0
    while True:
        c = stream.read(1)
        if c == '':
            raise EOFError('Unexpected EOF while reading varint')
        i = ord(c)
        result |= (i & 0x7f) << shift
        shift += 7
        if not (i & 0x80):
            break

    return result


def _write_varint(stream, i):
    buf = b''
    while True:
        towrite = i & 0x7f
        i >>= 7
        if i:
            buf += bytes((towrite | 0x80, ))
        else:
            buf += bytes((towrite, ))
            break

    return stream.write(buf)


def encode_deck(card_list, aspects):
    data = BytesIO()
    _write_varint(data, 1)
    _write_varint(data, len(aspects))

    for aspect in aspects:
        _write_varint(data, aspect)

    for x in range(1, 4):
        places = list(filter(lambda card_: card_[1] == x, card_list))

        _write_varint(data, len(places))

        for card in places:
            _write_varint(data, card[0])

    return base64.b64encode(data.getvalue()).decode('utf-8')


def decode_deck(deckstring):
    decoded = base64.b64decode(deckstring)
    data = BytesIO(decoded)

    version = _read_varint(data)

    aspects = []
    num_aspects = _read_varint(data)
    for x in range(num_aspects):
        aspects.append(_read_varint(data))

    cards = []
    num_cards_1 = _read_varint(data)
    for x in range(num_cards_1):
        cards.append((_read_varint(data), 1))

    num_cards_2 = _read_varint(data)
    for x in range(num_cards_2):
        cards.append((_read_varint(data), 2))

    num_cards_3 = _read_varint(data)
    for x in range(num_cards_3):
        cards.append((_read_varint(data), 3))

    return (version, aspects, cards)
