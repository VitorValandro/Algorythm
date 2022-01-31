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

function memoizationFibonacci(n) {
  /* 
  * Fibonacci solver using recursion and memoization.
  * Memoization is a optimization method like caching. Values already calculated
  * are stored in the memo array and reused instead being recalculated.
  * 
  * In fibonacci(5), for example, we calculate fibonacci(3) twice, so we can store and reuse the result,
  * saving some processing later.
  */
  if (n < 1) return 0;
  // memo is our cache. The index is n and the value is the result.
  const memo = [0, 1];

  const fibonacci = n => {
    // if fibonacci(n) has already been calculated, use its value
    if (memo[n] != null) return memo[n];
    // if not, calculate the value and store it into memo
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
  }

  return fibonacci(n);
}