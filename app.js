const SOURCE = [1, 1];
const TARGET = [18, 18];
const maze = new Maze(20, 20);
maze.generateMaze(SOURCE);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'));

aStar.discover(maze, SOURCE, TARGET);