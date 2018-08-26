// https://github.com/HearthSim/npm-deckstrings/blob/master/src/buffer.ts
// Copyright (c) 2017-2018, Benedict Etzel

class Iterator {
	constructor() {
		this.index = 0;
	}

	next(repeat = 1) {
		this.index += repeat;
	}
}

class BufferWriter extends Iterator {
	constructor() {
		super();
		this.buffer = [];
	}

	varint(value) {
		encode(value, this.buffer, this.index);
		this.next(encode.bytes);
	}

	toString() {
		const binary = String.fromCharCode(...this.buffer);
		return btoa(binary);
	}
}

class BufferReader extends Iterator {
	constructor(string) {
		super();
		const binary = atob(string);
		const buffer = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			buffer[i] = binary.charCodeAt(i);
		}
		this.buffer = buffer;
	}

	nextByte() {
		const value = this.buffer[this.index];
		this.next();
		return value;
	}

	nextVarint() {
		const value = decode(this.buffer, this.index);
		this.next(decode.bytes);
		return value;
	}
}
