import { BFS, BreadthFirstIteration } from "../algorithms/graphs/BreadthFirstSearch";
import { DFS, DFSIteration } from "../algorithms/graphs/DepthFirstSearch";
import { Dijkstra } from "../algorithms/graphs/Dijkstra";
import { floydWarshall } from "../algorithms/graphs/FloydWarshall";
import { kruskal } from "../algorithms/graphs/Kruskal";
import { Prim } from "../algorithms/graphs/Prims";
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

  test('Depth First Search (DFS)', () => {
    const expected_return = {
      discovery: { A: 1, B: 2, C: 10, D: 11, E: 3, F: 7, G: 12, H: 14, I: 4 },
      finished: { A: 18, B: 9, C: 17, D: 16, E: 6, F: 8, G: 13, H: 15, I: 5 },
      predecessors: {
        A: null,
        B: 'A',
        C: 'A',
        D: 'C',
        E: 'B',
        F: 'B',
        G: 'D',
        H: 'D',
        I: 'E'
      }
    }
    expect(DFS(graph)).toEqual(expected_return);
  })

  test('Depth First Search: Iterate over', () => {
    const expected_vertices = ['A', 'B', 'E', 'I', 'F', 'C', 'D', 'G', 'H']
    const vertices: (string | number)[] = [];

    const testCallback = (v: (string | number)) => { vertices.push(v); }
    DFSIteration(graph, testCallback);
    expect(vertices).toEqual(expected_vertices);
  })

  test('Dijkstra pathfinding', () => {
    const adjacency_graph = [
      [0, 2, 4, 0, 0, 0],
      [0, 0, 1, 4, 2, 0],
      [0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 3, 0, 2],
      [0, 0, 0, 0, 0, 0]
    ];

    expect(Dijkstra(adjacency_graph, 0)).toEqual([0, 2, 3, 6, 4, 6]);
  })

  test('Floyd-Warshall shortest path', () => {
    const expected_return = [
      [0, 3, 7, 5],
      [2, 0, 6, 4],
      [3, 1, 0, 5],
      [5, 3, 2, 0]
    ];

    const adjacency_graph = [
      [0, 3, Infinity, 5],
      [2, 0, Infinity, 4],
      [Infinity, 1, 0, Infinity],
      [Infinity, Infinity, 2, 0]
    ];

    expect(floydWarshall(adjacency_graph)).toEqual(expected_return);
  });

  test("Kruskal's MST algorithm", () => {
    const expected_return = {
      path: { '0,1': 2, '1,2': 3, '1,4': 5, '0,3': 6 },
      minCost: 16
    }

    const adjacency_graph = [
      [Infinity, 2, Infinity, 6, Infinity],
      [2, Infinity, 3, 8, 5],
      [Infinity, 3, Infinity, Infinity, 7],
      [6, 8, Infinity, Infinity, 9],
      [Infinity, 5, 7, 9, Infinity]
    ];

    expect(kruskal(adjacency_graph)).toEqual(expected_return);
  });

  test("Prim's MST algorithm", () => {
    const expected_return = [-1, 0, 1, 5, 1, 4];

    const adjacency_graph = [
      [0, 2, 4, 0, 0, 0],
      [2, 0, 2, 4, 2, 0],
      [4, 2, 0, 0, 3, 0],
      [0, 4, 0, 0, 3, 2],
      [0, 2, 3, 3, 0, 2],
      [0, 0, 0, 2, 2, 0]
    ];

    expect(Prim(adjacency_graph)).toEqual(expected_return);
  })
})