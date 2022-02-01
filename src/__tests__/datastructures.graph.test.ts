import { Graph } from "../datastructures/Graph";

const graph = new Graph();

describe("Testing the Graph data structure", () => {
  test('Graph creation', () => {
    const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (let i = 0; i < myVertices.length; i++) {
      graph.addVertex(myVertices[i]);
    }
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'G');
    graph.addEdge('D', 'G');
    graph.addEdge('D', 'H');
    graph.addEdge('B', 'E');
    graph.addEdge('B', 'F');
    graph.addEdge('E', 'I');

    expect(graph.toString().split(' ').join('')).toEqual(
      `A -> B C D
      B -> A E F
      C -> A D G
      D -> A C G H
      E -> B I
      F -> B
      G -> C D
      H -> D
      I -> E
      `.split(' ').join('')
    )
  });
})