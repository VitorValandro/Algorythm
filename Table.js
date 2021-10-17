class Table {
  constructor(row, col) {
    this.ROW = row;
    this.COL = col;

    this.matrix = (() => {
      let table = []
      for (let i = 0; i < this.ROW; i++) {
        let row = [];
        for (let j = 0; j < this.COL; j++) {
          row.push(0);
        }
        table.push(row);
      }
      return table;
    })();
  }

  assignSource(x, y) {
    this.matrix[x][y] = 'S';
  }
  assignTarget(x, y) {
    this.matrix[x][y] = 'T';
  }

  isNodeValid(x, y) {
    return (x >= 0 && x <= this.ROW)
      && (y >= 0 && y <= this.COL)
  }

  render(element) {
    const table = document.createElement('table');
    for (let i = 0; i < this.ROW; i++) {
      const tr = table.insertRow();
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
        }
        td.appendChild(document.createTextNode('\xa0'));
      }
    }
    element.appendChild(table);
  }
}

const table = new Table(10, 10);
table.assignSource(1, 1);
table.assignTarget(9, 9);
console.log(table.isNodeValid(9, 9));
console.log(table.isNodeValid(11, 11));
table.render(document.getElementById('root'));