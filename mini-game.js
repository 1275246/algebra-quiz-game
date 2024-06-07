document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    // Set canvas dimensions
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Set cell size and initial snake position
    var cellSize = 20;
    var snake = [{ x: 10, y: 10 }];
    var dx = 1;
    var dy = 0;

    // Set initial food position
    var food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / cellSize)) };

    // Variables for mini-game activation and timer
    var isMiniGameActive = false;
    var miniGameStartTime;

    // Variable to track if out of bounds message has been shown
    var outOfBoundsMessageShown = false;

    // Function to draw a single cell
    function drawCell(x, y) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    // Function to draw the snake
    function drawSnake() {
        snake.forEach(function(segment) {
            drawCell(segment.x, segment.y);
        });
    }

    // Function to draw the food
    function drawFood() {
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
    }

    // Function to move the snake
    function moveSnake() {
        var head = { x: snake[0].x + dx, y: snake[0].y + dy };
        
        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food position
            food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / cellSize)) };
        } else {
            // Remove the tail segment
            snake.pop();
        }
        
        // Add new head segment
        snake.unshift(head);
    }

    // Main game loop
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Move and draw snake
        if (isMiniGameActive) {
            moveSnake();
            drawSnake();
        }

        // Draw food
        drawFood();

        // Check for game over conditions
        var head = snake[0];
        if (isMiniGameActive && (head.x < 0 || head.x >= canvasWidth / cellSize || head.y < 0 || head.y >= canvasHeight / cellSize)) {
            // Out of bounds
            if (!outOfBoundsMessageShown) {
                outOfBoundsMessageShown = true;
                alert("Game over! You went out of bounds.");
                resetMiniGame();
            }
        } else if (isMiniGameActive && (Date.now() - miniGameStartTime) >= 30000) {
            // Timeout (30 seconds)
            alert("Time's up! You have reached the time limit.");
            resetMiniGame();
        } else {
            for (var i = 1; i < snake.length; i++) {
                if (isMiniGameActive && head.x === snake[i].x && head.y === snake[i].y) {
                    // Collided with itself
                    alert("Game over! You collided with yourself.");
                    resetMiniGame();
                }
            }
        }

        // Call game loop again
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    gameLoop();

    // Add event listener for keyboard input
    document.addEventListener("keydown", handleInput);

    // Function to handle user input
    function handleInput(event) {
        var key = event.keyCode;
        // Prevent default behavior for arrow keys
        if ([37, 38, 39, 40].includes(key)) {
            event.preventDefault();
        }
        // Handle snake movement
        if (key === 37 && dx === 0) { // Left arrow
            dx = -1;
            dy = 0;
        } else if (key === 39 && dx === 0) { // Right arrow
            dx = 1;
            dy = 0;
        } else if (key === 38 && dy === 0) { // Up arrow
            dx = 0;
            dy = -1;
        } else if (key === 40 && dy === 0) { // Down arrow
            dx = 0;
            dy = 1;
        }
    }

    // Function to start the mini-game
    function startMiniGame() {
        isMiniGameActive = true;
        miniGameStartTime = Date.now();
    }

    // Function to reset the mini-game
    function resetMiniGame() {
        isMiniGameActive = false;
        outOfBoundsMessageShown = false; // Reset message shown flag
        snake = [{ x: 10, y: 10 }]; // Reset snake position
        dx = 1;
        dy = 0;
        food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / cellSize)) }; // Generate new food position
    }
});
