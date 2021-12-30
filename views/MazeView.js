class Maze {
  constructor(row, col, mazeSize, cellSize, source, target) {
    this.ROW = row;
    this.COL = col;
    this.source = source;
    this.target = target;
    this.canvas = document.createElement('canvas');
    this.cellSize = cellSize;
    this.mazeSize = mazeSize;
    this.cellColors = {
      0: "#1F1F1F", // possible path cells
      1: "#000000", // wall cells
      'S': "#27BB65", // source cell
      'T': "#FD413C", // target cell
      'P': "#313C45", // traveled path cell,
      'R': "#daa520" // definitive route cell
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

  isNodeValid(node) {
    const [x, y] = node;
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

  getNodesAround(node, INDEX, nodeStateValidator) {
    let nodesAround = [];

    INDEX.forEach(i => {
      if (this.isNodeValid([node[0] + i, node[1]])
        && nodeStateValidator([node[0] + i, node[1]]))
        nodesAround.push([node[0] + i, node[1]]);

      if (this.isNodeValid([node[0], node[1] + i])
        && nodeStateValidator([node[0], node[1] + i]))
        nodesAround.push([node[0], node[1] + i]);
    })

    nodesAround = nodesAround.filter(currentNode => !isArrayEquals(currentNode, node))
    return nodesAround;
  }

  async render(element, stroke = true, className = '') {
    this.assignSource();
    this.assignTarget();

    if (this.canvas) {
      this.canvas.remove();
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.mazeSize;
      this.canvas.height = this.mazeSize;
      this.canvas.classList.add(className)
    }
    const ctx = this.canvas.getContext('2d');

    const cells = new Array(this.COL * this.ROW);
    // fill the cells array with values

    for (let y = 0; y <= this.ROW; y++) {
      for (let x = 0; x < this.COL; x++) {
        let index = x + y * this.COL;
        let cell = {}
        cell.x = x * this.cellSize;
        cell.y = y * this.cellSize;
        cell.type = this.matrix[x][y];

        cells[index] = cell;
      }
    }
    //draw every cell in the grid of cells
    cells.forEach((cell, i) => {
      ctx.beginPath();

      ctx.fillStyle = this.cellColors[cell.type];
      ctx.fillRect(cell.x, cell.y, this.cellSize, this.cellSize);

      if (stroke)
        ctx.strokeStyle = "#7B7B7B";

      ctx.strokeRect(cell.x, cell.y, this.cellSize, this.cellSize);
    })

    element.appendChild(this.canvas);
  }
}