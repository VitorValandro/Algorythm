/*
* This is an algorithm to find the Minimum Spanning Tree (MST) of a graph.
* The MST problem is very common in networks. For example, imagine that we want
* connect all islands in an archipelago by building the minimal number of
* bridges between them. This problem can easily be solved using MST algorithms.
*
* Here, the Kruskal's algorithm find a subset of edges that make a tree, including all vertices,
* which the total weight of all edges of the tree is the minimal possible.
* This implementation works in connected and undirected graphs represented by an adjacency matrix.
*/

function kruskal(graph) {
  const { length } = graph;
  const parent = [];
  let ne = 0; // count to control processed edges of the graph
  let a; let b; let u; let v;

  // copy the values from graph to cost, so we can manipulate the values
  const cost = initializeCost(graph);
  // iter through all edges in graph
  while (ne < length - 1) {
    // serach for the edge with smallest cost
    for (let i = 0, min = Infinity; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }
    // verify if edge already is in MST
    u = find(u, parent);
    v = find(v, parent);
    // if u and v are different, add it to MST
    if (union(u, v, parent)) {
      ne++;
    }
    // remove the processed edge to not process it again
    cost[a][b] = cost[b][a] = Infinity;
  }
  return parent;
}

function initializeCost(graph) {
  // Copy all elements of grapth to cost, replacint null values with infinite
  const cost = [];
  const { length } = graph;
  for (let i = 0; i < length; i++) {
    cost[i] = [];
    for (let j = 0; j < length; j++) {
      if (graph[i][j] === 0) {
        cost[i][j] = Infinity;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }
  return cost;
};

function find(i, parent) {
  while (parent[i]) {
    i = parent[i];
  }
  return i;
};

function union(i, j, parent) {
  if (i !== j) {
    parent[j] = i;
    return true;
  }
  return false;
};
