let initialMoveSpeed = 3;
let initialGravity = 2;
let moveSpeed = initialMoveSpeed;
let gravity = initialGravity;

let bird = document.querySelector(".bird");

let scoreValue = document.querySelector(".score_value");
let upPipe = document.querySelector(".up-pipe");
let downPipe = document.querySelector(".down-pipe");

let Enter = document.querySelector(".enter");

let gameState = "Start";
let gameLoop; // Variable to hold the game loop interval
let gravityLoop; // Variable to hold the gravity loop interval
let pipeInterval; // Variable to hold the pipe creation interval


// Initially hide the bird image
bird.style.display = "none";


document.addEventListener("keydown", handleKeyPress);




function handleKeyPress(e) {
  if (e.key === "Enter") {
    if (gameState !== "Play") {
      play();
      resetGame();
    } else if (gameState === "Play") {
      // Bird jump logic
      bird.src = "img/Bird-2.png";
      birdJump();

      // Change back to original bird image after a short delay
      setTimeout(() => {
        bird.src = "img/Bird.png";
      }, 200); // Adjust the delay as needed
    }
  }
}

function resetGame() {
  // Remove existing pipes
  document.querySelectorAll(".pipe").forEach((e) => {
    e.remove();
  });

  // Reset bird position
  bird.style.top = "40vh";

  // Reset game state
  gameState = "Play";

  // Clear message
  document.querySelector(".message").style.display = "none";

  // Reset score
  scoreValue.textContent = "0";


  // Clear any existing game loops and intervals
  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
  }
  if (gravityLoop) {
    cancelAnimationFrame(gravityLoop);
  }
  if (pipeInterval) {
    clearInterval(pipeInterval);
  }
  if (speedInterval) {
    clearInterval(speedInterval);
  }
  if (pipeDecreaseIntervalId) {
    clearInterval(pipeDecreaseIntervalId);
  }
}

function play() {
  // Display the bird image
  bird.style.display = "block";

  // Display score and set its initial value
  scoreValue.textContent = "0";

  // Clear any existing pipe creation interval
  clearInterval(pipeInterval);

  // Start creating pipes immediately and then every pipeCreationInterval milliseconds
  createPipe(); // Create initial pipe
  pipeInterval = setInterval(createPipe, 1250); // Create pipes at regular intervals

  // Animation Loop for moving pipes
  function move() {
    if (gameState !== "Play") return; // Exit if the game state is not 'Play'

    // Get all pipe elements
    let pipes = document.querySelectorAll(".pipe");

    // Move each pipe to the left
    pipes.forEach((pipe) => {
      // Update the pipe's left position
      let pipeLeft = parseFloat(pipe.style.left) - moveSpeed;
      pipe.style.left = pipeLeft + "px";

      // Check for collision with the bird
      if (checkCollision(pipe)) {
        // Handle collision (e.g., end the game)
        endGame();
      }

      // Check if the pipe is off-screen
      if (pipeLeft < -pipe.offsetWidth) {
        // Remove the pipe if it's off-screen
        pipe.remove();
        // Increment score
        updateScore();
      }
    });

    // Request the next animation frame
    gameLoop = requestAnimationFrame(move);
  }

  gameLoop = requestAnimationFrame(move);

  // Gravity function for bird
  function applyGravity() {
    if (gameState !== "Play") return;

    // Apply gravity to the bird
    let birdTop = parseFloat(bird.style.top) + gravity;
    bird.style.top = birdTop + "px";

    // Check if the bird crosses a height of 400px
    if (birdTop > 400) {
      endGame();
      return;
    }

    // Request the next animation frame
    gravityLoop = requestAnimationFrame(applyGravity);
  }
  gravityLoop = requestAnimationFrame(applyGravity);
}

// Function to create pipes
function createPipe() {
  if (gameState !== "Play") return; // Exit if the game state is not 'Play'

  // Create a new pipe element
  let pipe = document.createElement("div");
  pipe.className = "pipe";
  // Set the pipe's initial position (off-screen to the right)
  pipe.style.left = "2000px";
  // Set the pipe's top position (random position between 0 and 40% of window height)
  pipe.style.top = Math.random() * (window.innerHeight * 0.45) + "px";

  // Append the pipe to the document body
  document.body.append(pipe);
}

// Function to check collision with the bird
function checkCollision(pipe) {
  let birdRect = bird.getBoundingClientRect();
  let pipeRect = pipe.getBoundingClientRect();

  // Check for collision by comparing the positions of the rectangles
  if (
    birdRect.right > pipeRect.left &&
    birdRect.left < pipeRect.right &&
    birdRect.bottom > pipeRect.top &&
    birdRect.top < pipeRect.bottom
  ) {
    return true;
  } else {
    return false;
  }
}

// Function to end the game
function endGame() {
  gameState = "End";
  bird.style.display = "none";
  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
  }
  if (gravityLoop) {
    cancelAnimationFrame(gravityLoop);
  }
  if (pipeInterval) {
    clearInterval(pipeInterval);
  }
  if (speedInterval) {
    clearInterval(speedInterval);
  }
  document.addEventListener("keydown", restartGame);
}

// Function to update the score
function updateScore() {
  
  let currentScore = parseInt(scoreValue.textContent);
  let newScore = currentScore + 1;
  scoreValue.textContent = newScore;
}

// Function to handle bird jump
function birdJump() {
  
  let currentTop = parseFloat(bird.style.top);
  let newTop = currentTop - 40; 
  bird.style.top = newTop + "px";
}


///////////////////////////////////////////////////////////////////

function mobileDisplay() {
  if (window.innerWidth < 450) {
    console.log('Mobile display');
    
    Enter.addEventListener("click", handleEnter);
  

}

}

mobileDisplay();

function handleEnter() {
  if (gameState !== "Play") {
    playMobile();
    resetGame();
  } else if (gameState === "Play") {
    // Bird jump logic
    bird.src = "img/Bird-2.png";
    birdJump();

    // Change back to original bird image after a short delay
    setTimeout(() => {
      bird.src = "img/Bird.png";
    }, 200); // Adjust the delay as needed
  }
}

function createPipeMobile() {
  if (gameState !== "Play") return; // Exit if the game state is not 'Play'

  // Create a new pipe element
  let pipe = document.createElement("div");
  pipe.className = "pipe";
  // Set the pipe's initial position (off-screen to the right)
  pipe.style.left = "1000px";
  // Set the pipe's top position (random position between 0 and 40% of window height)
  pipe.style.top = Math.random() * (window.innerHeight * 0.3) + "px";

  // Append the pipe to the document body
  document.body.append(pipe);
}

function playMobile() {
  bird.style.display = "block";
  scoreValue.textContent = "0";
  clearInterval(pipeInterval);
  createPipeMobile();
  pipeInterval = setInterval(createPipeMobile, 800); 

  function move() {
    if (gameState !== "Play") return; 

    let pipes = document.querySelectorAll(".pipe");


    pipes.forEach((pipe) => {
      let pipeLeft = parseFloat(pipe.style.left) - moveSpeed;
      pipe.style.left = pipeLeft + "px";
      if (checkCollision(pipe)) {
        endGame();
      }


      if (pipeLeft < -pipe.offsetWidth) {
        
        pipe.remove();
        // Increment score
        updateScore();
      }
    });

    // Request the next animation frame
    gameLoop = requestAnimationFrame(move);
  }

  gameLoop = requestAnimationFrame(move);

  // Gravity function for bird
  function applyGravity() {
    if (gameState !== "Play") return;

    // Apply gravity to the bird
    let birdTop = parseFloat(bird.style.top) + gravity;
    bird.style.top = birdTop + "px";

    // Check if the bird crosses a height of 400px
    if (birdTop > 400) {
      endGame();
      return;
    }

    // Request the next animation frame
    gravityLoop = requestAnimationFrame(applyGravity);
  }
  gravityLoop = requestAnimationFrame(applyGravity);
}


// Function to detect mobile display

