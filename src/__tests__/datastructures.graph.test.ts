import { BFS, BreadthFirstIteration } from "../algorithms/graphs/BreadthFirstSearch";
import { Graph } from "../datastructures/Graph";

const graph_vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const graph = new Graph();

describe("Testing the Graph data structure", () => {
  test('Graph creation', () => {
    for (let i = 0; i < graph_vertices.length; i++) {
      graph.addVertex(graph_vertices[i]);
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

  test('Breadth First Search (BFS)', () => {
    const expected_return = {
      distances: { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 },
      predecessors: { A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G: "C", H: "D", I: "E" }
    }

    expect(BFS(graph, 'A')).toEqual(expected_return);
  });

  test('Breadth First Search: Iterate over', () => {
    const vertices: (string | number)[] = [];

    const testCallback = (v: (string | number)) => { vertices.push(v); }
    BreadthFirstIteration(graph, 'A', testCallback);
    expect(vertices).toEqual(graph_vertices);
  })
})