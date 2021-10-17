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
          row.push(0);
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