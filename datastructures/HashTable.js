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


}