/*
* This file has functions that help create the maze samples for mazes page.
*/

const sample_mazes = [
  {
    maze_size: 200,
    cell_size: 20,
    source: [1, 1],
    target: [8, 8],
  },
  {
    maze_size: 200,
    cell_size: 10,
    source: [1, 1],
    target: [18, 18],
  },
  {
    maze_size: 200,
    cell_size: 5,
    source: [1, 1],
    target: [38, 38],
  },
];

sample_mazes.forEach(sample => {
  const sample_maze = new Maze(
    sample.maze_size / sample.cell_size,
    sample.maze_size / sample.cell_size,
    sample.maze_size,
    sample.cell_size,
    sample.source,
    sample.target
  );
  RecursiveBacktrack.mazeGenerator(sample_maze, [1, 1]);
  sample_maze.render(document.getElementsByClassName('static_mazes')[0], stroke = false, 'sample');
});

let FINAL_MAZE;

function generateMaze(CELL_SIZE, show_grid, index, algorithm = "backtrack") {
  const MAZE_SIZE = 500;
  let source_coord = [];
  let target_coord = [];
  const cellsPerRowAndCol = MAZE_SIZE / CELL_SIZE;
  while (isArrayEquals(source_coord, target_coord)) {
    source_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
    target_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
  }
  const maze = new Maze(cellsPerRowAndCol, cellsPerRowAndCol, MAZE_SIZE, CELL_SIZE, source_coord, target_coord);

  if (algorithm == 'backtrack') {
    RecursiveBacktrack.mazeGenerator(maze, source_coord);
    maze.render(
      document.getElementsByClassName('test_canvas')[index],
      stroke = show_grid,
      'custom_maze'
    );
  }
  else if (algorithm == 'prims') {
    Prims.mazeGenerator(maze, source_coord, show_grid, index);
  }
  if (index == 2) {
    FINAL_MAZE = maze;
  }
};

function submitMaze(event, index, algorithm = undefined) {
  event.preventDefault();
  document.getElementsByClassName('custom_maze')[index].remove();
  show_grid = document.getElementsByClassName('show_grid')[index].checked;
  cell_size = document.getElementsByClassName('size_select')[index].value;

  if (!algorithm) {
    let algorithm = document.getElementsByClassName('generator_select')[0].value;
    generateMaze(cell_size, show_grid, index, algorithm);
    return;
  }

  generateMaze(cell_size, show_grid, index, algorithm);
};

function solveMaze() {
  heuristic = document.getElementsByClassName('heuristics_select')[0].value;
  aStar.discover(FINAL_MAZE, heuristic, 2);
};