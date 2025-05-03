import { createLinkedList, createNode } from "./linkedlist.js";

function HashMap(capacity, load_factor) {
	const buckets = [];

	function hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode = hashCode % capacity;
		}

		return hashCode;
	}

	function set(key, value) {
		const hashCode = hash(key);
		if (buckets[hashCode] === undefined) {
			buckets[hashCode] = createLinkedList();
			buckets[hashCode].append(key, value);
		} else {
			if (buckets[hashCode].findKey(key) === null) {
				buckets[hashCode].append(key, value);
			} else {
				let nodeIndex = buckets[hashCode].findKey(key);
				buckets[hashCode].at(nodeIndex).value = value;
			}
		}
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

	return { set, buckets, get };
}

const map = HashMap(4, 0.75);
map.set("key1", "value1");
map.set("key2", "value2");
map.set("key3", "value3");
map.set("key4", "value4");
map.set("key5", "value5");
map.set("key6", "value6");

window.debug = { HashMap, map };
