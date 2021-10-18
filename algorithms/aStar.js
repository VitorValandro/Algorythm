class aStar{
  static manhattamDistance(currentNode, targetNode){
    // method to determine the Manhattam Distance used as Heuristic (H) to a* algorithm
    return Math.abs(targetNode[0] - currentNode[0]) + 
            Math.abs(targetNode[1] - currentNode[1]);
  }

  static getNeighbors(maze, currentNode){
    /*
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
    let neighborhood = [];

    // it disconsider corners (just N, S, W and E)
    INDEX.forEach(i => {
      if (maze.isNodeValid(currentNode[0] + i, currentNode[1]) 
        && maze.isNodePassable([currentNode[0] + i, currentNode[1]]))
        neighborhood.push([currentNode[0] + i, currentNode[1]]);

      if (maze.isNodeValid(currentNode[0], currentNode[1] + i)
        && maze.isNodePassable([currentNode[0], currentNode[1] + i]))
        neighborhood.push([currentNode[0], currentNode[1] + i]);
    })

    // removes the current and return only the 8 adjacent squares
    neighborhood = neighborhood.filter(node => !isArrayEquals(node, currentNode))
    return neighborhood;
  }

  static async discover(maze, source, target){
    // Initialize open and close lists
    let openList = [];
    let closedList = [];

    // create nodes for start point and end point
    const sourceNode = new MazeNode(source);
    const targetNode = new MazeNode(target);

    // populate openList with start point
    openList.push(sourceNode);

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
      closedList.push(openList.pop());

      await sleep(100); // wait 100ms to display node in screen
      closedList.forEach(node => {
        const [i, j] = node.index;
        if (!isArrayEquals([i, j], sourceNode.index)
          && !isArrayEquals([i, j], targetNode.index))
          maze.matrix[i][j] = 'P'; // colors node in maze
      })
      maze.render(document.getElementById('root'));
      // have found the goal
      if (isArrayEquals(currentNode.index, targetNode.index)) {
        let path = [];
        let current = currentNode;
        while (current) {
          path.push(current.index); // save the path indexes in path array
          current = current.parent; // iterate over nodes by parent pointer
        }
        return path;
      }

      aStar
        .getNeighbors(maze, currentNode.index) // returns a list with indexes of adjacent nodes
        .forEach((neighborNodeIndex) => {
          // if not in closed list
          if (!closedList.indexOf(neighborNodeIndex) >= 0) {
            // create a new node for each neighbor
            let neighborNode = new MazeNode(neighborNodeIndex, currentNode);

            // add G and F attributes to node
            neighborNode.G = currentNode.G + 1;
            neighborNode.F = neighborNode.G + aStar.manhattamDistance(neighborNode.index, targetNode.index);

            // check if node already is in open list
            const nodeAlreadyInList = openList.indexOf(neighborNodeIndex);
            if (nodeAlreadyInList >= 0) {
              // check if the G cost is lesser going by this path
              if (openList[nodeAlreadyInList].G > neighborNode.G)
                // if so, update the node with the new G and F values
                openList[nodeAlreadyInList] = neighborNode;
            } else {
              // add it to open list
              openList.push(neighborNode);
            }
          }
        })
    }
  }
}

class MazeNode{
  constructor(index, parent=undefined){
    this.index = index;
    this.parent = parent;

    // H is calculated in calcF
    this.G = 0;
    this.F = 0;
  }
}