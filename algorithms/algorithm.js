const SOURCE = [1,1];
const TARGET = [4,9];

async function run_astar(maze, source, target){
  let openList = [];
  let closedList = [];

  const sourceNode = new MazeNode(source);
  const targetNode = new MazeNode(target);

  openList.push(sourceNode);

  while(openList.length > 0){
    // reorder the openList to make the lesser F as last node in list
    openList.sort((nodeA, nodeB) => {
      if(nodeA.F < nodeB.F)
        // se F de A for menor que B, A fica por último
        return 1;
      if(nodeA.F > nodeB.F)
        // se F de A for maior que B, B fica por último
        return -1;
      // se forem iguais, não altera ordem
      return 0;
    })

    let currentNode = openList[openList.length - 1];
    /* openList.forEach(node => node.F < currentNode.F && (currentNode = node)); */
    
    closedList.push(openList.pop());
    await sleep(100);
    closedList.forEach(node => {
      const [i, j] = node.index;
      if (!isArrayEquals([i, j], sourceNode.index) 
          && !isArrayEquals([i, j], targetNode.index))
        maze.matrix[i][j] = '1';
    })
    console.log(closedList);
    maze.render(document.getElementById('root'));
    

    // have found the goal
    if(isArrayEquals(currentNode.index,targetNode.index)){
      let path = [];
      let current = currentNode;
      while(current){
        path.push(current.index);
        current = current.parent;
      }
      return path;
    }

    aStar
      .getNeighbors(maze, currentNode.index)
      .forEach((neighborNodeIndex) => {
        if(!closedList.indexOf(neighborNodeIndex) >= 0){
          let neighborNode = new MazeNode(neighborNodeIndex, currentNode);

          //neighborNode.G = aStar.manhattamDistance(sourceNode.index, neighborNode.index);
          neighborNode.G = currentNode.G + 1;
          neighborNode.F = neighborNode.G + aStar.manhattamDistance(neighborNode.index, targetNode.index);

          const nodeAlreadyInList = openList.indexOf(neighborNodeIndex);
          if(nodeAlreadyInList >= 0){
            if(openList[nodeAlreadyInList].G > neighborNode.G)
              openList[nodeAlreadyInList] = neighborNode;
          } else {
            openList.push(neighborNode);
          }
        }
    })
  }
}

function isArrayEquals(arr1, arr2){
  // it works only in 1d arrays without nested arrays
  if(!arr1 || !arr2)
    return false;

  if(arr1.length != arr2.length)
    return false;
  
  for(let i = 0; i < arr1.length; i++){
    if(arr1[i] != arr2[i])
      return false
  }
  return true;
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

console.log(run_astar(maze, SOURCE, TARGET));