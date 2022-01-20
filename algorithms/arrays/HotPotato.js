/*
* The hot potato game problem
* This solution uses the Queue data structure
*/

function HotPotato(elementsList, num) {
  const queue = new Queue();
  const eliminatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    // enqueue all elements
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    // pass the potato through all elements in queue until remains just one player
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminatedList.push(queue.dequeue());
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
};