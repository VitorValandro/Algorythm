function loadImages(element, path, images) {
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = path + image;
    element.appendChild(img);
  })
}

function generateMaze(CELL_SIZE, show_grid, index, algorithm = "backtrack") {
  const MAZE_SIZE = 500;
  let source_coord = [];
  let target_coord = [];
  const cellsPerRowAndCol = MAZE_SIZE / CELL_SIZE;
  while (isArrayEquals(source_coord, target_coord)) {
    source_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
    target_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
  }
  const maze = new Maze(cellsPerRowAndCol, cellsPerRowAndCol, source_coord, target_coord);

  if (algorithm == 'backtrack') {
    RecursiveBacktrack.mazeGenerator(maze, source_coord);
    maze.render(
      document.getElementsByClassName('test_canvas')[index],
      MAZE_SIZE,
      CELL_SIZE,
      stroke = show_grid,
      'custom_maze'
    );
  }
  else if (algorithm == 'prims') {
    Prims.mazeGenerator(maze, source_coord, CELL_SIZE, show_grid, index);
  }
}

function submitMaze(event, index, algorithm) {
  event.preventDefault();
  console.log(document.getElementsByClassName('custom_maze'))
  document.getElementsByClassName('custom_maze')[index].remove();
  show_grid = document.getElementsByClassName('show_grid')[index].checked;
  maze_size = document.getElementsByClassName('size_select')[index].value;
  generateMaze(maze_size, show_grid, index, algorithm);
}