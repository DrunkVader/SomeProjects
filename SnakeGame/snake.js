// Get the canvas and 2D context
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

// Get the sounds
const collisionSound = document.getElementById("collisionSound");
const eatingSound = document.getElementById("eatingSound");
const pauseSound = document.getElementById("pauseSound");

// Game state variables
let gameRunning = false;
let gamePaused = false;
let grid = 16;
let count = 0;
let score = 0;
let gemEaten = false;
let allowanceCounter = 0;

// Snake properties
let snake = {
  x: 160,
  y: 160,
  dx: grid / 2,
  dy: 0,
  cells: [],
  maxCells: 4,
};

// Gem properties
let gem = {
  x: 320,
  y: 320,
};

// Animation frame ID
let animationFrame;

// DOM elements
let startButton = document.querySelector(".start-button");
let gameOverScreen = document.querySelector(".game-over");
let scoreDisplay = document.querySelector(".score-display");

// Function to get a random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Event listener for the start button
startButton.addEventListener("click", function () {
  startGame();
});

// Event listener for the restart button on game over screen
gameOverScreen
  .querySelector(".start-button")
  .addEventListener("click", function () {
    startGame();
  });

// Event listener for keyboard input
document.addEventListener("keydown", function (e) {
  // If the game is not running, pressing Enter starts the game
  if (!gameRunning) {
    if (e.key === "Enter") {
      startGame();
    }
    return;
  }

  // Handle arrow key input
  switch (e.key) {
    case "ArrowLeft":
      if (snake.dx === 0) {
        snake.dx = -grid / 2;
        snake.dy = 0;
      }
      break;
    case "ArrowUp":
      if (snake.dy === 0) {
        snake.dy = -grid / 2;
        snake.dx = 0;
      }
      break;
    case "ArrowRight":
      if (snake.dx === 0) {
        snake.dx = grid / 2;
        snake.dy = 0;
      }
      break;
    case "ArrowDown":
      if (snake.dy === 0) {
        snake.dy = grid / 2;
        snake.dx = 0;
      }
      break;
    case " ": // Spacebar
      // Toggle game pause state
      if (gamePaused) {
        gamePaused = false;
        animationFrame = requestAnimationFrame(loop);
      } else {
        gamePaused = true;
        cancelAnimationFrame(animationFrame);
        pauseSound.play();
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.font = "bold 30px Arial";
        context.fillText(
          "Game Paused",
          canvas.width / 2 - 100,
          canvas.height / 2
        );
      }
      break;
  }
});

// Event listeners for touch input
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", function (e) {
  if (!gameRunning) {
    return;
  }

  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", function (e) {
  if (!gameRunning) {
    return;
  }

  let touchEndX = e.touches[0].clientX;
  let touchEndY = e.touches[0].clientY;
  let dx = touchEndX - touchStartX;
  let dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0 && snake.dx === 0) {
      snake.dx = grid / 2;
      snake.dy = 0;
    } else if (dx < 0 && snake.dx === 0) {
      snake.dx = -grid / 2;
      snake.dy = 0;
    }
  } else {
    if (dy > 0 && snake.dy === 0) {
      snake.dy = grid / 2;
      snake.dx = 0;
    } else if (dy < 0 && snake.dy === 0) {
      snake.dy = -grid / 2;
      snake.dx = 0;
    }
  }
});

// Game loop function
function loop() {
  // If the game is not running or is paused, exit the loop
  if (!gameRunning || gamePaused) {
    return;
  }

  // Increment counters and update game state
  if (gemEaten) {
    allowanceCounter++;
    if (allowanceCounter >= 50) {
      gemEaten = false;
      allowanceCounter = 0;
    }
  }

  animationFrame = requestAnimationFrame(loop);

  if (++count < 100) {
    return;
  }
  count = 95;

  // Clear the canvas
  context.clearRect(0, 0, canvas.clientWidth, canvas.height);

  // Update snake position
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap the snake position on screen edges
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Add the current head position to the snake cells array and remove the tail if exceeding the maximum cell count
  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  // Grid Background
  context.strokeStyle = "rgba(255, 255, 255, 0.2)"; // Añadido para la cuadrícula
  for (let i = 0; i < canvas.width; i += grid) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
  for (let j = 0; j < canvas.height; j += grid) {
    context.beginPath();
    context.moveTo(0, j);
    context.lineTo(canvas.width, j);
    context.stroke();
  }

  // Draw the gems and the snake
  context.fillStyle = "#fff";
  context.fillRect(gem.x, gem.y, grid - 1, grid - 1);
  context.shadowColor = "rgba(0,0,0,0.5)";
  context.shadowBlur = 5;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.fillStyle = gemEaten ? "#ffff00" : "#061138";

  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Check if the snake has eaten the gem
    if (
      (cell.x === gem.x && Math.abs(cell.y - gem.y) <= grid) ||
      (cell.y === gem.y && Math.abs(cell.x - gem.x) <= grid)
    ) {
      snake.maxCells++;
      score++;
      scoreDisplay.textContent = score;
      eatingSound.play();
      gem.x = getRandomInt(0, 25) * grid;
      gem.y = getRandomInt(0, 25) * grid;
      gemEaten = true;
    }

    // Check collision with snake's own body (game is over!)
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        endGame();
      }
    }
  });
}

// Start Game function
function startGame() {
  // If the game is already running, exit the function
  if (gameRunning) {
    return;
  }

  // Initialize game state
  gameRunning = true;
  gamePaused = false;
  score = 0;
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid / 2;
  snake.dy = 0;
  gem.x = getRandomInt(0, 25) * grid;
  gem.y = getRandomInt(0, 25) * grid;

  // Hide start button and game over screen
  startButton.style.display = "none";
  gameOverScreen.style.display = "none";

  // Update score display
  scoreDisplay.textContent = score;

  // Cancel any existing animation frame and start the game loop
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  animationFrame = requestAnimationFrame(loop);
}

// End game function
function endGame() {
  // Update game state, show game over screen, and play collision sound
  gameRunning = false;
  gamePaused = true;
  gameOverScreen.style.display = "block";
  document.querySelector(".game-over .score-display").textContent = score;
  collisionSound.play();

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Cancel the animation frame
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
}
