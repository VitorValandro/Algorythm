const SOURCE = [1, 1];
const TARGET = [19, 19];
const MAZE_SIZE = 500;
const CELL_SIZE = 20;
// offer options 10, 20 and 25, 50
const maze = new Maze(MAZE_SIZE / CELL_SIZE, MAZE_SIZE / CELL_SIZE);
maze.generateMaze(SOURCE);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'), MAZE_SIZE, CELL_SIZE);

aStar.discover(maze, SOURCE, TARGET, "euclidean");