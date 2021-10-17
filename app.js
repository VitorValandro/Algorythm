const SOURCE = [1, 1];
const TARGET = [4, 9];
const maze = new Maze(10, 10);

maze.assignSource(SOURCE);
maze.assignTarget(TARGET);

maze.render(document.getElementById('root'));

aStar.discover(maze, SOURCE, TARGET);