function loadImages(element, path, images) {
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = path + image;
    element.appendChild(img);
  })
}

function generateMaze(CELL_SIZE, show_grid) {
  const MAZE_SIZE = 500;
  let source_coord = [];
  let target_coord = [];
  const cellsPerRowAndCol = MAZE_SIZE / CELL_SIZE;
  while (isArrayEquals(source_coord, target_coord)) {
    source_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
    target_coord = [Math.floor(Math.random() * (cellsPerRowAndCol)), Math.floor(Math.random() * (cellsPerRowAndCol))];
  }
  const maze = new Maze(cellsPerRowAndCol, cellsPerRowAndCol, source_coord, target_coord);

  RecursiveBacktrack.mazeGenerator(maze, source_coord);
  maze.render(
    document.getElementsByClassName('test_canvas')[0],
    MAZE_SIZE, CELL_SIZE,
    stroke = show_grid,
    'custom_backtrack_maze'
  );
}

function submitMaze(event) {
  event.preventDefault();
  document.querySelector('#custom_backtrack_maze').remove();
  show_grid = document.querySelector('#show_grid').checked;
  maze_size = document.querySelector('#size_select').value;
  generateMaze(maze_size, show_grid);
}