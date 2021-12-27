class Prims {
  static mazeGenerator(maze, sourceNode) {
    maze.matrix = Array(maze.ROW)
      .fill(null)
      .map(() => Array(maze.COL).fill(1));

    const [i, j] = sourceNode;

    maze.matrix[i][j] = 0;

    // list of frontier nodes from sourceNode
    let frontierNodesList = maze.getNodesAround(sourceNode, [-2, 2, 0], maze.isNodeAWall.bind(maze));
    while (frontierNodesList.length > 0) {
      let frontierNode = randomChoice(frontierNodesList);
      let frontierNeighborsList = maze.getNodesAround(frontierNode, [-2, 2, 0], maze.isNodePassable.bind(maze));

      if (frontierNeighborsList.length > 0) {
        let neighborNode = randomChoice(frontierNeighborsList);
        let inBetweenX = (frontierNode[0] + neighborNode[0]) / 2;
        let inBetweenY = (frontierNode[1] + neighborNode[1]) / 2;
        maze.matrix[frontierNode[0]][frontierNode[1]] = 0;
        maze.matrix[inBetweenX][inBetweenY] = 0;
      }

      frontierNodesList = frontierNodesList.concat(
        maze.getNodesAround(frontierNode, [-2, 2, 0], maze.isNodeAWall.bind(maze))
      );
      removeItem(frontierNodesList, frontierNode);
    }
  }
}