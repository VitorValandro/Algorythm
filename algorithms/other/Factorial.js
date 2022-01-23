/*
* Algorithm to calculate the factorial of a number n.
* Given a number n, the factorial of n (n!) is defined by the result of multiplication from 1 to n.
*
* E.g. n = 5; 5! -> 5 * 4 * 3 * 2 * 1 -> 120.
*/

function iterativeFactorial(n) {
  // Factorial solver algorithm using the for loop.
  if (n < 0) return undefined;

  let result = 1;
  for (let i = n; i > 1; i--) {
    result *= i;
    console.log(i);
  }
  return result;
}

function recursiveFactorial(n) {
  // Factorial solver algorithm using recursion.
  if (n === 1) {
    return n;
  }
  return n * recursiveFactorial(n - 1);
}
