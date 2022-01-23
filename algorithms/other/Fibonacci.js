/*
* The Fibonacci Sequence is a serie of numbers where the next number is the sum of
* the last two.
* E.g. -> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... 
*/

function iterativeFibonacci(n) {
  // Fibonacci solver using the for loop.
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let beforeLast = 0;
  let last = 1;
  let result = n;
  for (let i = 2; i <= n; i++) {
    result = beforeLast + last;
    beforeLast = last;
    last = result;
  }
  return result;
}

function recursiveFibonacci(n) {
  // Fibonacci solver using recursion.
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}