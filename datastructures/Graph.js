/*
* A graph is a data structure that represents a network.
* Graphs are a set of nodes (vertices) connected by edges.
* They are very useful in Computer Science and can represent or solve many problems.
*
* Here in this implementation, we will represent a Graph using an adjascent list.
* Our adjascent list will be a dictionary, where the key is the vertex and the value
* is an array with all adjascent vertices connected to it. 
*/

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = []; //array to store the name of vertices
    this.adjList = new Dictionary(); // adjascent list to map vertices and edges
  }

  getVertices() {
    // getter method - returns the vertices array
    return this.vertices;
  }

  getAdjList() {
    // getter method - returns the adjList dictionary
    return this.adjList;
  }

  addVertex(v) {
    // inserts a new vertex into the graph

    // check if vertex doesn't exists
    if (!this.vertices.includes(v)) {
      // add it to vertice's array
      this.vertices._push(v);
      // add it to adjascent list
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
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
    this.adjList.get(v)._push(w);

    // if graph isn't directed, link from w to v too
    if (!this.isDirected) {
      this.adjList.get(w)._push(v);
    }
  }

  toString() {
    // allows graph representation using string

    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }
}

const Status = {
  UNEXPLORED: 0,
  VISITED: 1,
  EXPLORED: 2
}

const initializeStatus = vertices => {
  const status = {};
  for (let i = 0; i < vertices.length; i++) {
    status[vertices[i]] = Status.UNEXPLORED;
  }
  return status;
}