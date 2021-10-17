class aStar{
  static manhattamDistance(currentNode, targetNode){
    // method to determine the Manhattam Distance used as Heuristic (H) to a* algorithm
    return Math.abs(targetNode[0] - currentNode[0]) + 
            Math.abs(targetNode[1] - currentNode[1]);
  }

  static calcF(source, target, current){
    // F = G + H

    // G = the distance between the current node and the source node
    const G = this.manhattamDistance(current, source);
    // H (heuristic) = estimated distance from the current node to the target node.
    const H = this.manhattamDistance(current, target);
    return G + H;
  }
}

console.log(aStar.calcF([1,1], [9,9], [0,0]));