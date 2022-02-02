/*
* This is an algorithm to find the Minimum Spanning Tree (MST) of a graph.
* The MST problem is very common in networks. For example, imagine that we want
* connect all islands in an archipelago by building the minimal number of
* bridges between them. This problem can easily be solved using MST algorithms.
*
* Here, the Prim's algorithm find a subset of edges that make a tree, including all vertices,
* which the total weight of all edges of the tree is the minimal possible.
* This implementation works in connected and undirected graphs represented by an adjacency matrix.
*/

export function Prim(graph: number[][]) {
  const parent = [];
  const key = [];
  const visited = [];
  const { length } = graph;

  // Populate key value as infinite and visited as false for each vertex
  for (let i = 0; i < length; i++) {
    key[i] = Infinity;
    visited[i] = false;
  }

  // the source vertex has key = 0 and parent = -1, because it is the root of MST
  key[0] = 0;
  parent[0] = -1;

  // iterate over all vertices
  for (let i = 0; i < length - 1; i++) {
    // Select the vertice with the lesser key in not visited list
    const u = minKey(graph, key, visited);
    visited[u] = true; // set it as visited so we don't process it again

    // Compare u with all other elements v
    for (let v = 0; v < length; v++) {
      // If a best path from u to v was found, make it the new path
      if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }
  // Returns a simple array with the MST
  return parent;
}

function minKey(graph: number[][], key: number[], visited: boolean[]) {
  // Initialize min value
  let min = Infinity;
  let minIndex = 0;
  for (let v = 0; v < graph.length; v++) {
    if (visited[v] === false && key[v] < min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
}