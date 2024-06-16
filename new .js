// Define a larger and more complex maze
const maze = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", " ", " ", " ", " ", " ", "#", " ", "#", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", "#", "#", " ", "#", " ", "#", " ", "#", "#", "#", " ", "#"],
  ["#", " ", " ", " ", " ", " ", "#", " ", "#", " ", " ", " ", " ", " ", "#"],
  ["#", "#", "#", " ", "#", "#", "#", " ", "#", "#", "#", "#", " ", "#", "#"],
  ["#", " ", " ", " ", "#", " ", " ", " ", " ", " ", " ", "#", " ", " ", "#"],
  ["#", " ", "#", "#", "#", " ", "#", "#", "#", " ", "#", "#", " ", " ", "#"],
  ["#", " ", " ", " ", " ", " ", " ", " ", "#", " ", " ", " ", " ", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "E", "#"]
];

let playerPos = { x: 1, y: 1 };
const endPos = { x: 8, y: 13 }; // Adjusted to match the larger maze size

let startTime;

function printMaze() {
  const mazeContainer = document.getElementById('maze');
  mazeContainer.innerHTML = '';

  maze.forEach((row, rowIndex) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');

      row.forEach((cell, colIndex) => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');

          if (rowIndex === playerPos.x && colIndex === playerPos.y) {
              cellElement.classList.add('player');
          } else if (cell === "#") {
              cellElement.classList.add('wall');
          } else if (cell === "E") {
              cellElement.classList.add('end');
          } else {
              cellElement.classList.add('path');
          }

          rowElement.appendChild(cellElement);
      });

      mazeContainer.appendChild(rowElement);
  });
}

function isValidMove(pos) {
  const { x, y } = pos;
  return x >= 0 && x < maze.length && y >= 0 && y < maze[0].length && maze[x][y] !== "#";
}

function movePlayer(direction) {
  let { x, y } = playerPos;
  if (direction === 'W') {
      x -= 1;
  } else if (direction === 'A') {
      y -= 1;
  } else if (direction === 'S') {
      x += 1;
  } else if (direction === 'D') {
      y += 1;
  }
  return { x, y };
}

function move(direction) {
  const newPos = movePlayer(direction);
  if (isValidMove(newPos)) {
      playerPos = newPos;
  } else {
      document.getElementById('message').textContent = 'Invalid move! Try again.';
      return;
  }
  printMaze();

  if (playerPos.x === endPos.x && playerPos.y === endPos.y) {
      const endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000; // Time in seconds
      document.getElementById('message').textContent = `Congratulations! You've reached the end of the maze in ${timeTaken} seconds.`;
      document.getElementById('controls').style.display = 'none'; // Hide controls when game is finished
  } else {
      document.getElementById('message').textContent = '';
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  printMaze();
  startTime = new Date(); // Record start time when the page loads
});