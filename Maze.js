class Maze {
  constructor(row, col) {
    this.ROW = row;
    this.COL = col;
    this.maze = document.createElement('table');

    this.matrix = (() => {
      let maze = []
      for (let i = 0; i < this.ROW; i++) {
        let row = [];
        for (let j = 0; j < this.COL; j++) {
          row.push(1);
        }
        maze.push(row);
      }
      return maze;
    })();
  }

  assignSource(node) {
    this.matrix[node[0]][node[1]] = 'S';
  }
  assignTarget(node) {
    this.matrix[node[0]][node[1]] = 'T';
  }

  isNodeValid(x, y) {
    return (x >= 0 && x < this.ROW)
      && (y >= 0 && y < this.COL)
  }

  generateMaze(sourceNode){
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // S, N, E, W
    const [i, j] = sourceNode;

    this.matrix[i][j] = 0; // sourceNode starts as a path
    // shuffle directions list to get a random one
    directions = shuffle(directions);

    while(directions.length > 0){
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
      if(this.isNodeValid(forwardNode[0], forwardNode[1]) 
        && this.matrix[forwardNode[0]][forwardNode[1]] == 1){
          // have found a path

          // set the node between currentNode and forwardNode as a path
          // [x, N, y] -> N is now a path
          let linkingNode = [
            i + (currentDirection[0]),
            j + (currentDirection[1])
          ]
          this.matrix[linkingNode[0]][linkingNode[1]] = 0;

          // move to the forwardNode and repeat recusively
          this.generateMaze(forwardNode);
        }
    }
    return;
  }

  render(element) {
    if(this.maze){
      this.maze.remove();
      this.maze = document.createElement('table');
    }
    for (let i = 0; i < this.ROW; i++) {
      const tr = this.maze.insertRow();
      for (let j = 0; j < this.COL; j++) {
        const td = tr.insertCell();
        switch (this.matrix[i][j]) {
          case 0:
            td.classList.add('nullNode');
            break;
          case 1:
            td.classList.add('fillNode');
            break;
          case 'S':
            td.classList.add('sourceNode');
            break;
          case 'T':
            td.classList.add('targetNode');
            break;
          case 'P':
            td.classList.add('pathNode');
            break;
        }
        td.appendChild(document.createTextNode('\xa0'));
      }
    }
    element.appendChild(this.maze);
  }
}