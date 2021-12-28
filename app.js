loadImages(
  document.getElementById("backtrack_steps"),
  "assets/backtracking/",
  ["1.PNG", "2.PNG", "3.PNG", "4.PNG", "5.PNG", "6.PNG", "7.PNG", "all.gif"]
);

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