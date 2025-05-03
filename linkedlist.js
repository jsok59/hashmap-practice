function createLinkedList() {
	let head = null;
	let tail = null;
	let size = 0;

	const getHead = () => {
		return head;
	};
	const getTail = () => {
		return tail;
	};
	const getSize = () => {
		return size;
	};
	const append = (key, value) => {
		let iter = head;
		if (iter === null) {
			head = createNode(key, value);
			tail = head;
			size++;
			return;
		}

		tail.nextNode = createNode(key, value);
		tail = tail.nextNode;
		size++;
	};

	const prepend = (value) => {
		let temp = createNode(value);
		temp.nextNode = head;
		head = temp;
		size++;
	};

	const at = (index) => {
		if (index + 1 > size) {
			console.log("Index overflow");
			return;
		}

		let iter = head;
		for (let i = 0; i < index; i++) {
			iter = iter.nextNode;
		}
		return iter;
	};

	const pop = () => {
		let iter = head;
		if (iter === null) {
			console.log("Nothing left!");
			return;
		}
		if (iter.nextNode === null) {
			head = null;
			tail = null;
			size--;
			return;
		}
		while (iter.nextNode.nextNode != null) {
			iter = iter.nextNode;
		}
		iter.nextNode = null;
		tail = iter;
		size--;
	};

	const containsValue = (value) => {
		let iter = head;
		do {
			if (iter.value === value) {
				return true;
			}
			iter = iter.nextNode;
		} while (iter !== null);

		return false;
	};

	const containsKey = (key) => {
		let iter = head;
		do {
			if (iter.key === key) {
				return true;
			}
			iter = iter.nextNode;
		} while (iter !== null);

		return false;
	};

	const findValue = (value) => {
		let iter = head;
		if (iter === null) return null;
		let counter = 0;
		do {
			if (iter.value === value) {
				return counter;
			}
			counter++;
			iter = iter.nextNode;
		} while (iter != null);
		return null;
	};

	const findKey = (key) => {
		let iter = head;
		if (iter === null) return null;
		let counter = 0;
		do {
			if (iter.key === key) {
				return counter;
			}
			counter++;
			iter = iter.nextNode;
		} while (iter != null);
		return null;
	};

	const toString = () => {
		let iter = head;
		if (iter === null) return null;
		let string = "";
		do {
			string += `(${iter.key}, ${iter.value}) -> `;
			iter = iter.nextNode;
		} while (iter !== null);
		string += `(${iter})`;
		console.log(string);
	};

	const insertAt = (value, index) => {
		let iter = head;
		let counter = 0;
		if (index < 0 || index > size) {
			console.log("Index out of range");
			return;
		}

		//Edge case 1: insert at 0
		if (index === 0) {
			prepend(value);
			return;
		}

		//Edge case 2: insert at end
		if (index === size) {
			append(value);
			return;
		}

		do {
			if (counter === index - 1) {
				const node = createNode(value);
				node.nextNode = iter.nextNode;
				iter.nextNode = node;
				size++;
				return;
			}
			counter++;
			iter = iter.nextNode;
		} while (iter !== null);
	};

	const removeAt = (index) => {
		let counter = 0;
		let iter = head;
		if (iter === null) return null;

		if (index < 0 || index > size) {
			console.log("Index out of range");
			return;
		}

		//Edge case: remove at 0
		if (index === 0) {
			head = head.nextNode;
			size--;
			return;
		}

		//Edge Case: remove at end
		if (index === size - 1) {
			pop();
			return;
		}

		while (iter.nextNode.nextNode !== null) {
			if (counter === index - 1) {
				iter.nextNode = iter.nextNode.nextNode;
				size--;
				return;
			}
			counter++;
			iter = iter.nextNode;
		}
	};

	return { getSize, getHead, getTail, append, prepend, at, pop, containsValue, containsKey, findKey, findValue, toString, insertAt, removeAt };
}

function createNode(key, value = null) {
	return { key, value, nextNode: null };
}

export { createLinkedList, createNode };

window.debug = { createLinkedList, createNode };
