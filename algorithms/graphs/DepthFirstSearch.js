/*
* The Depth First Search (DFS) algorithm travels the graph from the 0 index vertex and
* follows the path of adjascent nodes until the last vertex be visited. 
*
* These are the recursive steps for DFS:
*   1. Given a vertex UNVISITED v:
*     1.1. Sets v as VISITED;
*     1.2. For every UNVISITED neighbor w of v, go back to 1. with v = w
*     1.3. Sets v as EXPLORED.
*
* As it is uses recursion, the DFS uses the call stack to travel the graph.
* This algorithm implementation just iterates over the graph, executing a callback function
* for each element of the graph.
*
* E.g. -> const printVertex = (value) => console.log(value); -> will print all values of the graph
*/

function DFS(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  // start all vertices status as UNEXPLORED
  const status = initializeStatus(vertices)

  // Iterates over all vertices starting from the 0 index
  for (let i = 0; i < vertices.length; i++) {
    if (status[vertices[i]] === Status.UNEXPLORED) {
      // visit all UNEXPLORED vertices
      DFSVisit(vertices[i], status, adjList, callback);
      /*
      * This recursive function DFSVisit creates a Stack.
      * When all adjascent nodes of i has been visited, we backtrack to this
      * for loop again and call it for the next vertex, i++
      */
    }
  }
};

function DFSVisit(u, status, adjList, callback) {
  status[u] = Status.VISITED; // sets u as VISITED

  // calls the callback function over the u vertex
  if (callback) {
    callback(u);
  }
  // gets and iterates over all neighbors of u
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (status[w] === Status.UNEXPLORED) {
      // Recursively visitS all UNEXPLORED neighbors
      DFSVisit(w, status, adjList, callback);
    }
  }
  status[u] = Status.EXPLORED; // Sets u as EXPLORED
}