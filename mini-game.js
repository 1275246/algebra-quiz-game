document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    var rightPressed = false;
    var leftPressed = false;
    var answered = false; // Variable to track if a question has been answered

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                if (!answered) {
                    alert("GAME OVER");
                    document.location.reload();
                }
            }
        }

        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;

        requestAnimationFrame(draw); // Call the draw function again
    }

    draw(); // Start the drawing loop

    function check(answer) {
        var question = document.getElementById("question").innerHTML;
        var result = document.getElementById("result");
        var score = document.getElementById("score");

        if (answer == eval(question)) {
            result.innerHTML = "Correct! You get to play the mini-game!";
            score.innerHTML = parseInt(score.innerHTML) + 1;
            generate();
            answered = true; // Set answered to true after a correct answer
            // You can call a function to start the mini-game here
            // For example, startMiniGame();
        } else {
            result.innerHTML = "Incorrect! The correct answer is: " + eval(question);
            generate(); // Generate the next question regardless of the answer
            answered = false; // Reset answered to false after an incorrect answer
        }
    }
});
