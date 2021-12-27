const SOURCE = [1, 1];
const TARGET = [19, 19];
const MAZE_SIZE = 500;
const CELL_SIZE = 20;
// offer options 10, 20, 25 and 50
const maze = new Maze(MAZE_SIZE / CELL_SIZE, MAZE_SIZE / CELL_SIZE, SOURCE, TARGET);
maze.recursiveBacktrack(SOURCE);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'), MAZE_SIZE, CELL_SIZE);

aStar.discover(maze, SOURCE, TARGET, "euclidean");

Prims.mazeGenerator(maze, SOURCE);