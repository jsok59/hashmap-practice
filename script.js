import { createLinkedList, createNode } from "./linkedlist.js";

const hashmap_proto = {
	reload() {
		if (this.length() >= this.internalCapacity * this.load_factor) {
			const arr = this.entries();
			this.clear();
			this.internalCapacity *= 2;
			for (const element of arr) {
				this.set(element[0], element[1]);
			}
		}
	},

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % this.internalCapacity;
		}

		return hashCode;
	},

	set(key, value) {
		const hashCode = this.hash(key);
		if (this.buckets[hashCode] === undefined) {
			this.buckets[hashCode] = createLinkedList();
			this.buckets[hashCode].append(key, value);
		} else {
			let nodeIndex = this.buckets[hashCode].findKey(key);
			if (nodeIndex === null) {
				this.buckets[hashCode].append(key, value);
			} else {
				this.buckets[hashCode].at(nodeIndex).value = value;
			}
		}
		this.reload();
	},

	get(key) {
		const hashCode = this.hash(key);
		if (this.buckets[hashCode] === undefined) {
			return null;
		}

		const nodeIndex = this.buckets[hashCode].findKey(key);

		if (nodeIndex === null) {
			return null;
		}

		return this.buckets[hashCode].at(nodeIndex).value;
	},

	has(key) {
		const hashCode = this.hash(key);
		if (this.buckets[hashCode] === undefined) {
			return false;
		}

		if (this.buckets[hashCode].findKey(key) !== null) {
			return true;
		}

		return false;
	},

	remove(key) {
		const hashCode = this.hash(key);
		const nodeIndex = this.buckets[hashCode].findKey(key);
		if (this.buckets[hashCode] === undefined || nodeIndex === null) {
			return false;
		}

		this.buckets[hashCode].removeAt(nodeIndex);
		return true;
	},

	length() {
		return this.buckets.reduce((prev, curr) => (curr === undefined ? prev + 0 : prev + curr.getSize()), 0);
	},

	clear() {
		for (let i = 0; i < this.internalCapacity; i++) {
			this.buckets[i] = undefined;
		}
	},

	keys() {
		const arr = [];
		for (let i = 0; i < this.internalCapacity; i++) {
			if (this.buckets[i] === undefined) continue;
			let iter = this.buckets[i].getHead();
			while (iter != null) {
				arr.push(iter.key);
				iter = iter.nextNode;
			}
		}
		return arr;
	},

	values() {
		const arr = [];
		for (let i = 0; i < this.internalCapacity; i++) {
			if (this.buckets[i] === undefined) continue;
			let iter = this.buckets[i].getHead();
			while (iter != null) {
				arr.push(iter.value);
				iter = iter.nextNode;
			}
		}
		return arr;
	},

	entries() {
		const arr = [];
		for (let i = 0; i < this.internalCapacity; i++) {
			if (this.buckets[i] === undefined) continue;
			let iter = this.buckets[i].getHead();
			while (iter != null) {
				arr.push([iter.key, iter.value]);
				iter = iter.nextNode;
			}
		}
		return arr;
	},
};

function HashMap(capacity, load_factor) {
	return Object.create(hashmap_proto, {
		buckets: {
			value: [],
			writable: true,
			enumerable: true,
			configurable: true,
		},

		internalCapacity: {
			value: capacity,
			writable: true,
			enumerable: true,
			configurable: true,
		},

		load_factor: {
			value: load_factor,
			writable: true,
			enumerable: true,
			configurable: true,
		},
	});
}

const map = HashMap(4, 0.75);
for (let i = 0; i < 12; i++) {
	map.set(`key${i}`, `value${i}`);
}

window.debug = { HashMap, map };
