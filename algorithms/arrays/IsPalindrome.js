function IsPalindrome(string) {
  const stack = new Stack();
  let reversedString = '';
  for (let i = 0; i < string.length; i++) {
    stack.push(string[i]);
  }
  while (stack.size > 0) {
    reversedString += stack.pop().toString();
  }
  return reversedString == string;
}