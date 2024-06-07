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
            food = { x: Math.floor(Math.random() * (canvasWidth / cellSize)), y: Math.floor(Math.random() * (canvasHeight / c
