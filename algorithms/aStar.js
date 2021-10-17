class aStar{
  static manhattamDistance(currentNode, targetNode){
    // method to determine the Manhattam Distance used as Heuristic (H) to a* algorithm
    return Math.abs(targetNode[0] - currentNode[0]) + 
            Math.abs(targetNode[1] - currentNode[1]);
  }

  static calcG(source, current){
    return this.manhattamDistance(current, source);
  }

  static calcF(source, target, current){
    // F = G + H

    // G = the distance between the current node and the source node
    const G = this.calcG(source, current);
    // H (heuristic) = estimated distance from the current node to the target node.
    const H = this.manhattamDistance(current, target);
    return G + H;
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

      neighborhood = [N.W, N.E, N, S.W, S.E, S, W, E, current] --> in this order
    */
    const INDEX = [-1, 1, 0];
    let neighborhood = [];

    INDEX.forEach(i => {
      INDEX.forEach(j => {
        if(maze.isNodeValid(currentNode[0] + i, currentNode[1] + j))
          neighborhood.push([currentNode[0] + i, currentNode[1] + j]);
      })
    })
    neighborhood.pop(); // removes the current and return only the 8 adjacent squares
    return neighborhood;
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

console.log(aStar.calcF([1,1], [9,9], [2,2]));