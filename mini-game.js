document.addEventListener("DOMContentLoaded", function() {
    // Setup canvas
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

    // Main game loop
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Move and draw snake
        moveSnake();
        drawSnake();

        // Draw food
        drawFood();

        // Check for game over conditions
        var head = snake[0];
        if (head.x < 0 || head.x >= canvasWidth / cellSize || head.y < 0 || head.y >= canvasHeight / cellSize) {
            // Out of bounds
            alert("Game over! You went out of bounds.");
            document.location.reload();
        } else {
            for (var i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    // Collided with itself
                    alert("Game over! You collided with yourself.");
                    document.location.reload();
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
});
