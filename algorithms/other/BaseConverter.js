/* 
* Algorithm to convert numbers in decimal base to any base from 2 to 36.
* It uses Stack data structure.
*/

function BaseConverter(num, base) {
  const stack = new Stack(); // init stack
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rem; // rem = remainder of division
  let string = '';
  if (!(base >= 2 && base <= 36)) {
    // restrict bases to 2-36 interval
    return '';
  }
  while (num > 0) {
    rem = Math.floor(num % base);
    stack.push(rem);
    num = Math.floor(num / base);
  }
  while (!stack.isEmpty()) {
    // converts number in string using it as index in digits
    string += digits[stack.pop()];
  }
  return string;
}