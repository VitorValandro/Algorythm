/*
* The Linear Probing Hash Table is a special type of hash map to avoid hash collisions.
* In simple Hash Tables, when we have same hashed keys to different elements they are overwritted.
* With Linear Probing, when elements have the same key we increment its index until find a position
* in the table available (empty) to store it.
*
* So, with we have Alice (key = 5) and Bob (key = 5), instead of Bob overwritte Alice, we will have
* Alice stored in position 5 (hash[5] = Alice) and Bob stored in position 5 + 1 (hash[6] = Bob).
*/

class HashTableLinearProbing extends HashTable {
  constructor() {
    super();
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      // check if the position of hash table is available
      if (this.table[position] == null) {
        // if true, add to it the value pair (key, value)
        this.table[position] = new ValuePair(key, value);
      }

      else {
        // if not, increment the hashed key index until find a position available
        let index = position + 1;
        while (this.table[index] != null) {
          index++;
        }
        // when found, add to it the value pair
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      // check if the elemet is in the specified key
      if (this.table[position].key === key) {
        // if true, return its value
        return this.table[position].value;
      }

      // if not, increment the index of hashed key until find the position of specified key
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }

      // after the while loop, check if the current index contains the specified key
      if (this.table[index] != null && this.table[index].key === key) {
        // if true, return its value
        return this.table[position].value;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);

    if (this.table[position] != null) {
      // check if the elemet is in the specified key
      if (this.table[position].key === key) {
        // if true, delete the valuePair of this position
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }

      // if not, increment the index of hashed key until find the position of specified key
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }

      // after the while loop, check if the current index contains the specified key
      if (this.table[index] != null && this.table[index].key === key) {
        // if true, delete the valuePair of this position
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  verifyRemoveSideEffect(key, removedPosition) {
    /*
    * This is a function to verify and correct the side effects of removing an element.
    * When a element is added in a position bigger than its hashed key and we remove
    * this element, we have to fill the empty position with other elements that had their
    * position modified.
    * 
    * For example, the hashed key of Alice, Bob and Charlie is 5.
    * So, when we put them in the hash table:
    * 
    * hash.put(key, Alice) -> hashCode(Alice) = 5 -> hash[5] = Alice (position 5)
    * hash.put(key, Bob) -> hashCode(Bob) = 5 -> hash[5 + 1] = Bob (position 6)
    * hash.put(key, Charlie) -> hashCode(Charlie) = 5 -> hash[5 + 2] = Charlie (position 7)
    * 
    * Now, we remove Bob. Let's take a look on the table:
    * 
    * hash[5] = Alice
    * hash[6] = null
    * hash[7] = Charlie
    * 
    * We don't want a null value there, because there is one more item to iter when getting Charlie (key = 5) 
    * in the hash table, that is made to be fast. So, we need to remove Bob and then realocate all elements
    * after that want to occupy this position (like Charlie, that also have a key = 5).
    * 
    * So we call this function (verifyRemoveSideEffect), and our table will be:
    * 
    * hash[5] = Alice
    * hash[6] = Charlie
    * 
    * Anad hash[7] or Bob no longer exists.
    */


    // get the hash of the removed element
    const hash = this.hashCode(key);

    // get the index of position next to the removed
    let index = removedPosition + 1;
    // iterate until find a empty position
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }
}