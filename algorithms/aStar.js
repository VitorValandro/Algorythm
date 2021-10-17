class aStar{
  constructor(matrix, source, target){
    this.matrix = matrix;
    this.source = source;
    this.target = target;
  }

  manhattamDistance(){
    return Math.abs(this.target[0] - this.source[0]) + 
            Math.abs(this.target[1] - this.source[1]);
  }
}

const astar = new aStar(table, [1,1], [9,9]);

console.log(astar.manhattamDistance())