const sample_mazes = [
  {
    maze_size: 200,
    cell_size: 20,
    source: [1, 1],
    target: [8, 8],
  },
  {
    maze_size: 200,
    cell_size: 10,
    source: [1, 1],
    target: [18, 18],
  },
  {
    maze_size: 200,
    cell_size: 5,
    source: [1, 1],
    target: [38, 38],
  },
]

sample_mazes.forEach(sample => {
  const sample_maze = new Maze(
    sample.maze_size / sample.cell_size,
    sample.maze_size / sample.cell_size,
    sample.source,
    sample.target
  );
  RecursiveBacktrack.mazeGenerator(sample_maze, [1, 1]);
  sample_maze.render(document.getElementsByClassName('static_mazes')[0], sample.maze_size, sample.cell_size, stroke = false);
})