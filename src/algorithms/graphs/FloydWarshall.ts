/*
* The Floyd Warshall algorithm is used to get the shortest path from all vertices to 
* all other vertices in a graph represented by an adjacency matrix.
*/

export function floydWarshall(graph: number[][]) {
  const dist: number[][] = [];
  const { length } = graph;

  // Populate the distance array
  for (let i = 0; i < length; i++) {
    dist[i] = [];
    for (let j = 0; j < length; j++) {
      // if i equals j, the distance is 0
      if (i === j) {
        dist[i][j] = 0;
      }
      // if there is no edge connecting two i and j, the distance is infinite
      else if (!isFinite(graph[i][j])) {
        dist[i][j] = Infinity;
      }
      // if they're connected, the distance between i and j is the weight of edge connecting it
      else {
        dist[i][j] = graph[i][j];
      }
    }
  }

  // Using 0...k as intermediary points, the shortest path from i to j is given by k
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        // Check if going by the k intermediary is a new shortest path
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  // returns a matrix with the shortest distances between every pair of vertices
  return dist;
}