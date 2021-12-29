class RecursiveBacktrack {
  static async mazeGenerator(maze, node) {
    /*
      This is an algorithm to generate randomized mazes
      it receives as input the sourceNode from the maze will start
      and converts the maze.matrix with the new maze
    */

    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // S, N, E, W

    const [i, j] = node; // sourceNode starts as a path
    maze.matrix[i][j] = 0;

    // shuffle directions list to get a random one
    directions = shuffle(directions);

    while (directions.length > 0) {
      // get the last item of the shuffled list and remove it
      let currentDirection = directions.pop();

      // calculate the new node's coordinates [i, j] using our random direction
      // multiply by 2 because we want jump 1 node and get the next one
      // like [x, N, y] where x is current and y is the forward node
      let forwardNode = [
        i + (currentDirection[0] * 2),
        j + (currentDirection[1] * 2)
      ];

      // check if the forwardNode is a wall
      if (maze.isNodeValid(forwardNode)
        && maze.isNodeAWall(forwardNode)) {
        // have found a path

        // set the node between currentNode and forwardNode as a path
        // [x, N, y] -> N is now a path
        let linkingNode = [
          i + (currentDirection[0]),
          j + (currentDirection[1])
        ]
        maze.matrix[linkingNode[0]][linkingNode[1]] = 0;

        // move to the forwardNode and repeat recursively
        this.mazeGenerator(maze, forwardNode);
      }
    }
    return;
  }
} 