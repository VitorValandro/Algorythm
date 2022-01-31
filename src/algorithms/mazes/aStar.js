class aStar {
  static manhattanDistance(currentNode, targetNode) {
    // method to determine the Manhattam Distance used as Heuristic (H) to a* algorithm
    return Math.abs(targetNode[0] - currentNode[0]) +
      Math.abs(targetNode[1] - currentNode[1]);
  }

  static euclideanDistance(currentNode, targetNode) {
    // method to determine the Euclidean Distance used as Heuristic (H) to a* algorithm
    // we don't calculate the square of it to save processing time
    return ((currentNode[0] - targetNode[0]) ** 2) + ((currentNode[1] - targetNode[1]) ** 2);
  }

  static getNeighbors(maze, currentNode) {
    /*
      This method uses the getNodesAround method from Maze.js to get
      a list with the coordinates of all neighbors (passable, not walls) of the currentNode.

      Getting the 8 neighbors of current node
      N.W  N   N.E
       \   |   /
        \  |  /
   W----Current----E
        /  |  \
       /   |   \
      S.W  S   S.E

      Current -->    current node         [i][j]
      N       -->    Up node              [i-1][j]
      S       -->    Down node            [i+1][j]
      E       -->    Left node            [i][j+1]
      W       -->    Right node           [i][j-1]
      N.E     -->    Up left node         [i-1][j+1]
      N.W     -->    Up right node        [i-1][j-1]
      S.E     -->    Down left node       [i+1][j+1]
      S.W     -->    Down right node      [i+1][j-1]

      neighborhood = [N.W, N.E, N, S.W, S.E, S, W, E, current]

      in this algorithm we disconsider the corners, so if you want consider it 
      you'll have to include in neighborhood the N.E, N.W, S.E, SW cells as well

    */
    const INDEX = [-1, 1, 0];
    return maze.getNodesAround(currentNode, INDEX, maze.isNodePassable.bind(maze));
  }

  static async discover(maze, heuristic = "manhattan", index) {
    const heuristicAlgorithms = {
      "manhattan": aStar.manhattanDistance,
      "euclidean": aStar.euclideanDistance
    }
    // Initialize open and close lists
    let openList = [];
    let closedList = [];

    // create nodes for start point and end point
    const sourceNode = new MazeNode(maze.source);
    const targetNode = new MazeNode(maze.target);

    // populate openList with start point
    openList._push(sourceNode);

    // algorithm loop
    while (openList.length > 0) {
      // reorder the openList to make the lesser F as last node in list
      openList.sort((nodeA, nodeB) => {
        if (nodeA.F < nodeB.F)
          // se F de A for menor que B, A fica por último
          return 1;
        if (nodeA.F > nodeB.F)
          // se F de A for maior que B, B fica por último
          return -1;
        // se forem iguais, não altera ordem
        return 0;
      })

      // get the node with lesser F in openList
      let currentNode = openList[openList.length - 1];

      // add current node to closed list and remove from open list
      closedList._push(openList._pop());

      await sleep(100); // wait 100ms to display node in screen
      closedList.forEach(node => {
        const [i, j] = node.index;
        if (!isArrayEquals([i, j], sourceNode.index)
          && !isArrayEquals([i, j], targetNode.index))
          maze.matrix[i][j] = 'P'; // colors node in maze
      })
      maze.render(document.getElementsByClassName('test_canvas')[index], false, 'custom_maze');
      // have found the goal
      if (isArrayEquals(currentNode.index, targetNode.index)) {
        let path = [];
        let current = currentNode;
        while (current) {
          path._push(current.index); // save the path indexes in path array
          current = current.parent; // iterate over nodes by parent pointer
        }
        path.forEach(index => maze.matrix[index[0]][index[1]] = 'R');
        maze.render(document.getElementsByClassName('test_canvas')[index], false, 'custom_maze');
        return path;
      }

      aStar
        .getNeighbors(maze, currentNode.index) // returns a list with indexes of adjacent nodes
        .forEach((neighborNodeIndex) => {
          // if not in closed list
          if (!closedList._indexOf(neighborNodeIndex) >= 0) {
            // create a new node for each neighbor
            let neighborNode = new MazeNode(neighborNodeIndex, currentNode);

            // add G and F attributes to node
            neighborNode.G = currentNode.G + 1;
            neighborNode.H = heuristicAlgorithms[heuristic](neighborNode.index, targetNode.index);
            neighborNode.F = neighborNode.G + neighborNode.H;

            // check if node already is in open list
            const nodeAlreadyInList = openList._indexOf(neighborNodeIndex);
            if (nodeAlreadyInList >= 0) {
              // check if the G cost is lesser going by this path
              if (openList[nodeAlreadyInList].G > neighborNode.G)
                // if so, update the node with the new G and F values
                openList[nodeAlreadyInList] = neighborNode;
            } else {
              // add it to open list
              openList._push(neighborNode);
            }
          }
        })
    }
  }
}

class MazeNode {
  constructor(index, parent = undefined) {
    this.index = index;
    this.parent = parent;

    // H is calculated in calcF
    this.G = 0;
    this.H = 0;
    this.F = 0;
  }
}