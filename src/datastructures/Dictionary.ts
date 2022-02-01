/* eslint-disable @typescript-eslint/no-explicit-any */
/*
* A dictionary is a collection used to store pairs of keys and values.
* Unlike Sets, Stacks or Queues, dictionaries are nonsequential.
*/

class ValuePair<K, V> {
  constructor(public key: K, public value: V) { }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

export class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> };
  toStr: (item: K) => string;

  constructor() {
    this.table = {};
    // the toStr() function is important because javascript objects just accepts
    // strings for keys, so we need to convert all keys to string.
    this.toStr = (item: any) => {
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

  set(key: K, value: V) {
    // adds a new value to the dict. If key already exists, its value will be overwritted.
    if (key != null && value != null) {
      const tableKey = this.toStr(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key: K) {
    // removes a value from the dict
    if (this.hasKey(key)) {
      delete this.table[this.toStr(key)];
      return true;
    }
    return false;
  }

  hasKey(key: K) {
    // returns if a specific key is in the dict (boolean)
    return this.table[this.toStr(key)] != null;
  }

  get(key: K) {
    // returns the value of the specified key from the dict
    const valuePair = this.table[this.toStr(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  clear() {
    // removes all elements of the dict
    this.table = {};
  }

  size() {
    // returns the amount of elements in the dict
    return this.keyValues().length;
  }

  isEmpty() {
    // returns if the dict has no elements (boolean)
    return this.size() === 0;
  }

  keys() {
    // returns an array with all keys of the dict
    return this.keyValues().map(valuePair => valuePair.key)
  }

  values() {
    // returns an array with all values of the dict
    return this.keyValues().map(valuePair => valuePair.value)
  }

  keyValues() {
    // returns an array with all pairs of [key, value] of the dict
    return Object.values(this.table);
  }

  forEach(callbackFn: (key: K, value: V) => any) {
    // iterates over values of the dict. This method is breaked if the callback function returns false.
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  toSring() {
    if (this.isEmpty()) {
      return '';
    }

    const valuePairs = this.keyValues();
    let string = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      string = `${string},${valuePairs[i].toString()}`;
    }
    return string;
  }
}