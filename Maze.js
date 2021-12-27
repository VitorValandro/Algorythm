class Maze {
  constructor(row, col, source, target) {
    this.ROW = row;
    this.COL = col;
    this.source = source;
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.cellColors = {
      0: "#1F1F1F", // possible path cells
      1: "#000000", // wall cells
      'S': "#27BB65", // source cell
      'T': "#FD413C", // target cell
      'P': "#313C45" // traveled path cell
    }

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

  assignSource() {
    this.matrix[this.source[0]][this.source[1]] = 'S';
  }
  assignTarget() {
    this.matrix[this.target[0]][this.target[1]] = 'T';
  }

  isNodeValid(x, y) {
    return (x >= 0 && x < this.ROW)
      && (y >= 0 && y < this.COL)
  }

  isNodeAWall(node) {
    const [i, j] = node;
    return this.matrix[i][j] == 1;
  }

  isNodePassable(node) {
    const [i, j] = node;
    return this.matrix[i][j] == 0 || this.matrix[i][j] == 'T';
  }

  recursiveBacktrack(sourceNode) {
    /*
      This is an algorithm to generate randomized mazes
      it receives as input the sourceNode from the maze will start
      and converts the this.matrix with the new maze
    */

    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // S, N, E, W
    const [i, j] = sourceNode;

    this.matrix[i][j] = 0; // sourceNode starts as a path
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
      if (this.isNodeValid(forwardNode[0], forwardNode[1])
        && this.isNodeAWall(forwardNode)) {
        // have found a path

        // set the node between currentNode and forwardNode as a path
        // [x, N, y] -> N is now a path
        let linkingNode = [
          i + (currentDirection[0]),
          j + (currentDirection[1])
        ]
        this.matrix[linkingNode[0]][linkingNode[1]] = 0;

        // move to the forwardNode and repeat recursively
        this.recursiveBacktrack(forwardNode);
      }
    }
    return;
  }

  render(element, mazeSize, cellSize) {
    maze.assignSource();
    maze.assignTarget();

    if (this.canvas) {
      this.canvas.remove();
      this.canvas = document.createElement('canvas');
      this.canvas.width = mazeSize;
      this.canvas.height = mazeSize;
    }
    const ctx = this.canvas.getContext('2d');

    const cells = new Array(this.COL * this.ROW);
    // fill the cells array with values

    for (let y = 0; y <= this.ROW; y++) {
      for (let x = 0; x < this.COL; x++) {
        let index = x + y * this.COL;
        let cell = {}
        cell.x = x * cellSize;
        cell.y = y * cellSize;
        cell.type = this.matrix[x][y];

        cells[index] = cell;
      }
    }
    //draw every cell in the grid of cells
    cells.forEach((cell, i) => {
      ctx.beginPath();

      ctx.fillStyle = this.cellColors[cell.type];
      ctx.fillRect(cell.x, cell.y, cellSize, cellSize);

      ctx.strokeStyle = "#7B7B7B";
      ctx.strokeRect(cell.x, cell.y, cellSize, cellSize);
    })

    element.appendChild(this.canvas);
  }
}