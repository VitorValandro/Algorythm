/*
* It's like a Dictionary, but instead store the pair (key, value), the key is a hash
* and it store only the value.
*
* Implements an associative array abstract data type, a structure that can map keys to values. 
* A hash table uses a hash function to compute an index, also called a hash code, into an array 
* of slots, from which the desired value can be found. During lookup, the key is hashed 
* and the resulting hash indicates where the corresponding value is stored.
*
* This simple HashTable allows collision between keys with the same hash, so take a look into
* Separate Chaining and Linear Probing to smarter models.
*/

class HashTable {
  constructor() {
    this.table = {};
    this.toStr = (item) => {
      if (item === null) {
        "NULL";
      }
      else if (item === undefined) {
        "UNDEFINED";
      }
      else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
      }
      return item.toString();
    }
  }

  loseloseHashCode(key) {
    // Returns the sum of ASCII representations of key string
    // "John" -> 74 + 111 + 104 + 110 -> 399
    if (typeof (key) === 'number') {
      return key;
    }

    const tableKey = this.toStr(key); // transform the key into string

    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i); // convert the char to ASCII int and sum it
    }
    return hash % 37; // use the rem operator to work with smaller numbers
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    // adds (or updates) a new item to the hash table
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    // removes a value of the hash table using a key
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];

    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }

    return false;
  }

  get(key) {
    // returns a value of the hash table using a key
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.table).length;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    const keys = Object.keys(this.table);
    let string = `${keys[0]} => ${this.table[keys[0]].toString()}`;
    for (let i = 0; i < keys.length; i++) {
      string = `${string},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return string;
  }
}