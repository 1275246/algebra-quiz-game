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
        drawCell(food.x, food.y);
    }

    // Function to move the snake
    function moveSnake() {
        var head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            // Snake ate the food
            food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / cellSize)) };
        } else {
            // Remove tail segment
            snake.pop();
        }
    }

    // Function to handle user input
    function handleInput(event) {
        var key = event.keyCode;
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
            alert("Game over! You went out of bounds.");
            resetMiniGame();
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

    // Function to reset the mini-game
    function resetMiniGame() {
        isMiniGameActive = false;
        snake = [{ x: 10, y: 10 }]; // Reset snake position
        dx = 1;
        dy = 0;
        food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / cellSize)) }; // Generate new food position
    }
});
