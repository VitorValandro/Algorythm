# Algorythm
Algorythm is a simple website to visualize and understand popular algorithms. I started it when I finished the Harvard's CS50x Introduction to Computer Science course, where I understood the importance of low-level knowledge. Currently, I'm working on Maze generators and solvers and on Array sorting algorithms, but the goal of this project is to always be updating and adding new stuff.

All the project is made with vanilla javascript, without any modules or external packages. The idea is write basic algorithms with the raw language to improve my knowledge of the javascript itself and how some basic features are made, like how an array is sorted, how graphs works, how random numbers are generated and what data types really are under the hood. With Algorythm I'm also learning about performance and optimization, studying space-time complexity. Some of the algorithms I had already implemented in C, but I chosen javascript for this repository because of the flexibility of web pages and the HTML canvas, which is used to implement the animations that allows a step-by-step visualization.

I really had fun programming this algorithms, and I intend to keep adding new ones.

## Some samples
### Mazes
This was the first kind of algorithm that I implement for Algorythm. The inspiration came from my version of [Pacman](https://github.com/VitorValandro/pacman-py) in python, where I tried to implement the A* pathfinding for the ghosts be smarter, but my design of the game and of the maze didn't allow a graph-like approach. So, to prove myself that I could do it, I adapted the A* pathfinding to work in a bidimensional matrix with rows and cols and programmed it. Then I added some more algorithms for mazes. Here is the A* result:
<div align="center">
  <img src="https://user-images.githubusercontent.com/50156875/148546111-7b14f526-71e4-41ce-bf30-4eed84a62589.gif">
</div>

<hr />
### Arrays
Arrays are one of the most used and useful data structures in programming. Arrays are used in many other more complex problems and be able to implement these simple functions is a very important skill to a developer. So, there is my motivation to this page and to Algorythm, understand data structures and algorithms to always know what is going on under the hood. Here is an example of how Selection Sort algorithm sort an array:
