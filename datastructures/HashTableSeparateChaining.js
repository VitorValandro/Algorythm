/*
* The Separate Chaining Hash Table is a special type of hash map to avoid hash collisions.
* In simple Hash Tables, we can have the same hashed keys to different string keys, with the
* Separate Chaining we create a Linked List for each hashed key and store the pair (key, value)
* in it. So, if we have more than one pair with the same hashed key, we can differ among them inside
* the Linked List.
*/

class HashTableSeparateChaining extends HashTable {
  constructor() {
    super();
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      if (this.table[position] == null) {
        // Creates a Linked List to store the values in the hash key
        this.table[position] = new LinkedList();
      }

      // adds the new value to the Linked List in the hash key
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position]; // get the linked list in key position

    if (linkedList != null && !linkedList.isEmpty()) {
      // iterate over the linked list until find the specified key (key is a string, position is the hashed key)
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          // if found, return the value of the key
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];

    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      // iterate over the linked list until find the specified key
      while (current != null) {
        if (current.element.key === key) {
          // if found, remove the valuePair from Linked List
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            // if there is no more element in Linked List, remove it from the Hash Table
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size();
    });
    return count;
  }
}