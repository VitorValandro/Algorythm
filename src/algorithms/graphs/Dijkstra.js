/*
* The Dijkstra's pathfinding algorithm works searching the shortest path
* from a source node to all other vertices of a graph.
*
* In this implementation, we just return the values (distances) from a source
* vertex (src) to all other nodes of a graph represented by a adjacency matrix.
*/

function Dijkstra(graph, src) {
  const INF = Infinity;

  const dist = []; // array to store the distances
  const visited = []; // array to store the visited vertices
  const { length } = graph;

  // Start all distances as infinite
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false;
  }
  dist[src] = 0; // the source vertex must have distance equals 0

  // search for the shortest path for all vertices
  for (let i = 0; i < length - 1; i++) {
    const u = minDistance(dist, visited); // select the vertice with min dist
    visited[u] = true; // set as visited to not calc it twice

    for (let v = 0; v < length; v++) {
      if (!visited[v]
        && graph[u][v] !== 0
        && dist[u] !== INF
        && dist[u] + graph[u][v] < dist[v] // check if it is the shortest path
      ) {
        // if so, set dist[v] to this value
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  // return an array with the value of shortest path from src to all other vertices
  return dist;
}

function minDistance(dist, visited) {
  // returns the index of the min distance in dist array
  let min = Infinity;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
}