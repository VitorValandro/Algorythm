/*
* The Prim's algorithm is a greedy algorithm writed in 1930 by Czech 
* mathematician Vojtěch Jarník to find minimum spanning tree for a graph.
* Here, I wrote a version of the Prim's algorithm in javascript to 
* generate a random maze in a bidimensional array (2d matrix).
*
* This is the pseudo-code I follow to write this code:
*
* 1. A Grid consists of a 2 dimensional array of cells.
* 2. A Cell has 2 states: Blocked or Passage.
* 3. Start with a Grid full of Cells in state Blocked.
* 4. Pick a random Cell, set it to state Passage and Compute its frontier cells. A frontier 
*    cell of a Cell is a cell with distance 2 in state Blocked and within the grid.
* 5. While the list of frontier cells is not empty:
*   1. Pick a random frontier cell from the list of frontier cells.
*   2. Let neighbors(frontierCell) = All cells in distance 2 in state Passage. 
*   3. Pick a random neighbor and connect the frontier cell with the neighbor by setting 
*      the cell in-between to state Passage. 
*   4. Compute the frontier cells of the chosen frontier cell and add them to the frontier list. 
*   5. Remove the chosen frontier cell from the list of frontier cells.
*
* To work in bidimensional arrays - where a node can be a wall or a passage - some changes were made.
* This draw can help to understand better the Frontier and Neighbor nodes:
*
*   [-, -, -, -, N, -, -, -, -]
*   [-, -, -, -, |, -, -, -, -]     C = current main node;
*   [-, -, -, -, F, -, -, -, -]     F = frontier node;
*   [-, -, -, -, -, -, -, -, -]     N = neighbor node;
*   [N, |, F, -, C, -, F, |, N]     | = passage node;
*   [-, -, -, -, -, -, -, -, -]
*   [-, -, -, -, F, -, -, -, -]
*   [-, -, -, -, |, -, -, -, -]
*   [-, -, -, -, N, -, -, -, -]
*
*   Starting from a C point, the algorithm randomly chooses one of the F nodes to get.
*   In a F node, the algorithm get the N node and build a bridge between F and N. This is a passage.
*   Then it turns the F node into a C node and continues until there are no more C nodes available as walls.
*/

class Prims {
  // start with a Grid full of nodes in state Wall
  static mazeGenerator(maze, sourceNode) {
    maze.matrix = Array(maze.ROW)
      .fill(null)
      .map(() => Array(maze.COL).fill(1));

    const [i, j] = sourceNode;

    maze.matrix[i][j] = 0;

    // pick the start cell, set it to state Passage and compute its frontier cells
    let frontierNodesList = maze.getNodesAround(sourceNode, [-2, 2, 0], maze.isNodeAWall.bind(maze));
    // while the list of frontier cells is not empty:
    while (frontierNodesList.length > 0) {
      // pick a random frontier cell from the list of frontier cells.
      let frontierNode = randomChoice(frontierNodesList);
      // let neighbors(frontierCell) = All cells in distance 2 in state Passage
      let frontierNeighborsList = maze.getNodesAround(frontierNode, [-2, 2, 0], maze.isNodePassable.bind(maze));

      if (frontierNeighborsList.length > 0) {
        /*
        * Pick a random neighbor and connect the frontier cell with the neighbor by setting
        * the cell in -between to state Passage. 
        */
        let neighborNode = randomChoice(frontierNeighborsList);
        let inBetweenX = (frontierNode[0] + neighborNode[0]) / 2;
        let inBetweenY = (frontierNode[1] + neighborNode[1]) / 2;
        maze.matrix[frontierNode[0]][frontierNode[1]] = 0;
        maze.matrix[inBetweenX][inBetweenY] = 0;
      }
      // compute the frontier cells of the chosen frontier cell and add them to the frontier list. 
      frontierNodesList = frontierNodesList.concat(
        maze.getNodesAround(frontierNode, [-2, 2, 0], maze.isNodeAWall.bind(maze))
      );
      // remove the chosen frontier cell from the list of frontier cells
      removeItem(frontierNodesList, frontierNode);
    }
  }
}