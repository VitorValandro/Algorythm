class Prims {
  static getFrontier(maze, startNode) {
    const INDEX = [-2, 2, 0];
    let frontierList = [];
    INDEX.forEach(i => {
      if (maze.isNodeValid([startNode[0] + i, startNode[1]])
        && maze.isNodeAWall([startNode[0] + i, startNode[1]]))
        frontierList.push([startNode[0] + i, startNode[1]]);

      if (maze.isNodeValid([startNode[0], startNode[1] + i])
        && maze.isNodeAWall([startNode[0], startNode[1] + i]))
        frontierList.push([startNode[0], startNode[1] + i]);
    })

    // removes the current and return only the 8 adjacent squares
    frontierList = frontierList.filter(node => !isArrayEquals(node, startNode))
    return frontierList;
  }

  static getNeighbors(maze, startNode) {
    //DIRECTIONS = [[2, 0], [-2, 0], [0, 2], [0, -2]]; // S, N, E, W;
    const INDEX = [-2, 2, 0];
    let neighborList = [];
    INDEX.forEach(i => {
      if (maze.isNodeValid([startNode[0] + i, startNode[1]])
        && maze.isNodePassable([startNode[0] + i, startNode[1]]))
        neighborList.push([startNode[0] + i, startNode[1]]);

      if (maze.isNodeValid([startNode[0], startNode[1] + i])
        && maze.isNodePassable([startNode[0], startNode[1] + i]))
        neighborList.push([startNode[0], startNode[1] + i]);
    })

    // removes the current and return only the 8 adjacent squares
    neighborList = neighborList.filter(node => !isArrayEquals(node, startNode))
    return neighborList;
  }

  static mazeGenerator(maze, sourceNode) {
    maze.matrix = Array(maze.ROW)
      .fill(null)
      .map(() => Array(maze.COL).fill(1));

    const [i, j] = sourceNode;

    maze.matrix[i][j] = 0;

    let frontierNodesList = this.getFrontier(maze, sourceNode); // list of frontier nodes from sourceNode
    while (frontierNodesList.length > 0) {
      let frontierNode = randomChoice(frontierNodesList);
      let frontierNeighborsList = this.getNeighbors(maze, frontierNode);

      if (frontierNeighborsList.length > 0) {
        let neighborNode = randomChoice(frontierNeighborsList);
        let inBetweenX = (frontierNode[0] + neighborNode[0]) / 2;
        let inBetweenY = (frontierNode[1] + neighborNode[1]) / 2;
        maze.matrix[frontierNode[0]][frontierNode[1]] = 0;
        maze.matrix[inBetweenX][inBetweenY] = 0;
      }
      frontierNodesList = frontierNodesList.concat(this.getFrontier(maze, frontierNode));
      removeItem(frontierNodesList, frontierNode);
    }
  }
}