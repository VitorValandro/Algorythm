loadImages(
  document.getElementById("backtrack_steps"),
  "assets/backtracking/",
  ["1.PNG", "2.PNG", "3.PNG", "4.PNG", "5.PNG", "6.PNG", "7.PNG", "all.gif"]
);

//RecursiveBacktrack.mazeGenerator(maze, SOURCE);
generateMaze(20, false, 0, 'backtrack');
generateMaze(20, false, 1, 'prims');
generateMaze(20, false, 2, 'backtrack');
//maze.render(document.getElementsByClassName('test_canvas')[0], MAZE_SIZE, CELL_SIZE);

//Prims.mazeGenerator(maze, SOURCE);

//aStar.discover(maze, SOURCE, TARGET, "euclidean");