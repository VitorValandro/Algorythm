/* eslint-disable @typescript-eslint/no-explicit-any */
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
*
* Time complexity : O(V + E)
*/

import { Graph, initializeStatus, Status } from "../../datastructures/Graph";
import { Queue } from "../../datastructures/Queue";

export function BreadthFirstIteration(graph: Graph, startVertex: (string | number), callback: (v: (number | string)) => any) {
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
    const neighbors = adjList.get(u) || [];

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
}

/*
* This is a improved version of Breadth First Search. While the algorithm BFIteration above just
* iterates over the Graph executing a callback, this algorithm saves the distances of vertices
* from the startVertex and track the predecessor for every node, so we can get the shortest path from
* startVertex to all other nodes.
*/
export function BFS(graph: Graph, startVertex: (string | number)) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const status = initializeStatus(vertices);
  const Q = new Queue(); // create the queue Q

  const distances: any = {};
  const predecessors: any = {};

  // Populate distances and predecessors with start values
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  // Enqueue the start vertex
  Q.enqueue(startVertex);
  while (!Q.isEmpty()) {
    // Dequeue u from Q
    const u = Q.dequeue();
    status[u] = Status.VISITED; // Set u as VISITED
    // Get all neighbors of u
    const neighbors = adjList.get(u) || [];

    for (let i = 0; i < neighbors.length; i++) {
      // Enqueue all neighbors w that are UNEXPLORED 
      const w = neighbors[i];
      if (status[w] === Status.UNEXPLORED) {
        status[w] = Status.VISITED;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        Q.enqueue(w);
      }
    }
    // Set u as EXPLORED
    status[u] = Status.EXPLORED;
  }

  // returns the distances from startVertex to other nodes and the track of predecessors
  // with this values, we can easily get the shortest path from startVertex to each other node.
  return {
    distances,
    predecessors
  }
}