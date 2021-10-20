const SOURCE = [1, 1];
const TARGET = [19, 19];
const maze = new Maze(20, 20);
maze.generateMaze(SOURCE);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'));

aStar.discover(maze, SOURCE, TARGET, "euclidean");