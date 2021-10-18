const SOURCE = [1, 1];
const TARGET = [9, 9];
const maze = new Maze(10, 10);
maze.generateMaze(SOURCE);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'));

aStar.discover(maze, SOURCE, TARGET);