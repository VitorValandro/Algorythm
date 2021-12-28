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
]

sample_mazes.forEach(sample => {
  const sample_maze = new Maze(
    sample.maze_size / sample.cell_size,
    sample.maze_size / sample.cell_size,
    sample.source,
    sample.target
  );
  RecursiveBacktrack.mazeGenerator(sample_maze, [1, 1]);
  sample_maze.render(document.getElementsByClassName('static_mazes')[0], sample.maze_size, sample.cell_size, stroke = false);
})

const SOURCE = [1, 1];
const TARGET = [20, 24];
const MAZE_SIZE = 500;
const CELL_SIZE = 10;
// offer options 10, 20, 25 and 50
const maze = new Maze(MAZE_SIZE / CELL_SIZE, MAZE_SIZE / CELL_SIZE, SOURCE, TARGET);
//maze.recursiveBacktrack(SOURCE);


maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

RecursiveBacktrack.mazeGenerator(maze, SOURCE);

maze.render(document.getElementById('canvas'), MAZE_SIZE, CELL_SIZE);

//Prims.mazeGenerator(maze, SOURCE);

//aStar.discover(maze, SOURCE, TARGET, "euclidean");