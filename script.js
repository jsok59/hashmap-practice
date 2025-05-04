import { createLinkedList, createNode } from "./linkedlist.js";

function HashMap(capacity, load_factor) {
	const buckets = [];
	let internalCapacity = capacity;

	function reload() {
		if (length() >= internalCapacity * load_factor) {
			const arr = entries();
			clear();
			internalCapacity *= 2;
			for (const element of arr) {
				set(element[0], element[1]);
			}
		}
	}

	function hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % internalCapacity;
		}

		return hashCode;
	}

	function set(key, value) {
		const hashCode = hash(key);
		if (buckets[hashCode] === undefined) {
			buckets[hashCode] = createLinkedList();
			buckets[hashCode].append(key, value);
		} else {
			let nodeIndex = buckets[hashCode].findKey(key);
			if (nodeIndex === null) {
				buckets[hashCode].append(key, value);
			} else {
				buckets[hashCode].at(nodeIndex).value = value;
			}
		}
		reload();
	}

	function get(key) {
		const hashCode = hash(key);
		if (buckets[hashCode] === undefined) {
			return null;
		}

		if (buckets[hashCode].findKey(key) === null) {
			return null;
		}

		let nodeIndex = buckets[hashCode].findKey(key);
		return buckets[hashCode].at(nodeIndex).value;
	}

	function has(key) {
		const hashCode = hash(key);
		if (buckets[hashCode] === undefined) {
			return false;
		}

		if (buckets[hashCode].findKey(key) !== null) {
			return true;
		}

		return false;
	}

	function remove(key) {
		const hashCode = hash(key);
		const nodeIndex = buckets[hashCode].findKey(key);
		if (buckets[hashCode] === undefined || nodeIndex === null) {
			return false;
		}

		buckets[hashCode].removeAt(nodeIndex);
		return true;
	}

	function length() {
		return buckets.reduce((prev, curr) => (curr === undefined ? prev + 0 : prev + curr.getSize()), 0);
	}

	function clear() {
		for (let i = 0; i < internalCapacity; i++) {
			buckets[i] = undefined;
		}
	}

	function keys() {
		const arr = [];
		for (let i = 0; i < internalCapacity; i++) {
			if (buckets[i] === undefined) continue;
			let iter = buckets[i].getHead();
			while (iter != null) {
				arr.push(iter.key);
				iter = iter.nextNode;
			}
		}
		return arr;
	}

	function values() {
		const arr = [];
		for (let i = 0; i < internalCapacity; i++) {
			if (buckets[i] === undefined) continue;
			let iter = buckets[i].getHead();
			while (iter != null) {
				arr.push(iter.value);
				iter = iter.nextNode;
			}
		}
		return arr;
	}

	function entries() {
		const arr = [];
		for (let i = 0; i < internalCapacity; i++) {
			if (buckets[i] === undefined) continue;
			let iter = buckets[i].getHead();
			while (iter != null) {
				arr.push([iter.key, iter.value]);
				iter = iter.nextNode;
			}
		}
		return arr;
	}

	return { set, buckets, get, has, remove, length, clear, keys, values, entries };
}

const map = HashMap(4, 0.75);
map.set("key1", "value1");
map.set("key2", "value2");
map.set("key3", "value3");
map.set("key4", "value4");
map.set("key5", "value5");
map.set("key6", "value6");
map.set("key7", "value7");

window.debug = { HashMap, map };
