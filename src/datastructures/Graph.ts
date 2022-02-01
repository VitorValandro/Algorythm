/* eslint-disable @typescript-eslint/no-explicit-any */
/*
* A graph is a data structure that represents a network.
* Graphs are a set of nodes (vertices) connected by edges.
* They are very useful in Computer Science and can represent or solve many problems.
*
* Here in this implementation, we will represent a Graph using an adjascent list.
* Our adjascent list will be a dictionary, where the key is the vertex and the value
* is an array with all adjascent vertices connected to it. 
*
* Time complexity:
*   Adjacency list:
*     - Size of tree: O(V + E)
*     - Vertex insertion: O(1)
*     - Edge insertion: O(1)
*     - Vertex removal: O(V + E)
*     - Edge removal: O(E)
*     - Get (query): O(V)
*   Adjacency matrix:
*     - Size of tree: O(2V)
*     - Vertex insertion: O(V²)
*     - Edge insertion: O(1)
*     - Vertex removal: O(V²)
*     - Edge removal: O(1)
*     - Get (query): O(1)
*/

import { Dictionary } from "./Dictionary";

export class Graph {
  private vertices: (string | number)[] = [];
  private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary();

  constructor(private isDirected = false) { }

  getVertices() {
    // getter method - returns the vertices array
    return this.vertices;
  }

  getAdjList() {
    // getter method - returns the adjList dictionary
    return this.adjList;
  }

  addVertex(v: string | number) {
    // inserts a new vertex into the graph

    // check if vertex doesn't exists
    if (!this.vertices.includes(v)) {
      // add it to vertice's array
      this.vertices.push(v);
      // add it to adjascent list
      this.adjList.set(v, []);
    }
  }

  addEdge(v: string | number, w: string | number) {
    // link two vertices (v, w) by creating an edge

    // check if vertex v exists, if not, create it
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    // check if vertex w exists, if not, create it
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }

    // link from v to w by adding w to v's ajdascent list
    this.adjList.get(v)?.push(w);

    // if graph isn't directed, link from w to v too
    if (this.isDirected !== true) {
      this.adjList.get(w)?.push(v);
    }
  }

  toString() {
    // allows graph representation using string

    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]) || [];
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
}

export enum Status {
  UNEXPLORED = 0,
  VISITED = 1,
  EXPLORED = 2
}

export const initializeStatus = (vertices: (string | number)[]) => {
  const status: any = {};
  for (let i = 0; i < vertices.length; i++) {
    status[vertices[i]] = Status.UNEXPLORED;
  }
  return status;
}