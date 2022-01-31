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

function DFSIteration(graph, callback) {
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

function DFSIterationVisit(u, status, adjList, callback) {
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

/*
* This is a improved version of Depth First Search. While the algorithm DFSIteration above just
* iterates over the Graph executing a callback, this algorithm saves time of visit and exploration
* of vertices, besides store the predecessor node. This can be used in directional graphs to determine
* a logical path followin the directions, for example.
*
* Another practical example for this implementation is the topological sort (TopSort) in Directed
* Acyclic Graphs (DAGs).
*
*
* Time complexity : O(V + E)
*/

function DFS(graph) {
  // 1 ≤ d[u] < f[u] ≤ 2|V|

  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  // start all vertices status as UNEXPLORED
  const status = initializeStatus(vertices);
  // initialize some params to store information of graph
  const d = {};
  const f = {};
  const p = {};
  const time = { count: 0 };

  // populate objects with start values
  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    // visit all UNEXPLORED vertices
    if (status[vertices[i]] === Status.UNEXPLORED) {
      DFSVisit(vertices[i], status, d, f, p, time, adjList);
      /*
      * This recursive function DFSVisit creates a Stack.
      * When all adjascent nodes of i has been visited, we backtrack to this
      * for loop again and call it for the next vertex, i++
      */
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}

function DFSVisit(u, status, d, f, p, time, adjList) {
  status[u] = Status.VISITED; // sets u as VISITED

  d[u] = ++time.count; // register the instant of visit
  // gets and iterates over all neighbors of u
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    // Recursively visitS all UNEXPLORED neighbors
    if (status[w] === Status.UNEXPLORED) {
      p[w] = u; // register the predecessor
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  status[u] = Status.EXPLORED; // Sets u as EXPLORED
  f[u] = ++time.count; // register the instant of final exploration
}