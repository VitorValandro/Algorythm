/*
* The Breadth Fisrt Search (BFS) algorithm starts travelling from the first specified vertex
* and then visits all its adjacent vertices, one layer at time.
*
* This is the pseudocode:
*   1. Create a queue Q;
*   2. Sets v as VISITED and enqueue v into Q;
*   3. While Q isn't empty, repeat:
*     3.1. Dequeue u from Q;
*     3.2. Sets u as VISITED;
*     3.3. Enqueue all UNEXPLORED neighbors of u into Q;
*     3.4. Sets u as EXPLORED.
*
* Unlike DFS, the BFS algorithm uses the Queue data structure to travel through vertices.
* This algorithm implementation just iterates over the graph, executing a callback function
* for each element of the graph.
*
* E.g. -> const printVertex = (value) => console.log(value); -> will print all values of the graph
*/

function BFS(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const status = initializeStatus(vertices);
  const Q = new Queue(); // create the queue Q

  // Enqueue the start vertex
  Q.enqueue(startVertex);
  while (!Q.isEmpty()) {
    // Dequeue u from Q
    const u = Q.dequeue();
    status[u] = Status.VISITED; // Set u as VISITED
    // Get all neighbors of u
    const neighbors = adjList.get(u);

    for (let i = 0; i < neighbors.length; i++) {
      // Enqueue all neighbors w that are UNEXPLORED 
      const w = neighbors[i];
      if (status[w] === Status.UNEXPLORED) {
        status[w] = Status.VISITED;
        Q.enqueue(w);
      }
    }

    // Set u as EXPLORED
    status[u] = Status.EXPLORED;
    // calls callback function on u vertex
    if (callback) {
      callback(u);
    }
  }
};