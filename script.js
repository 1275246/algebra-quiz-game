// List of expressions for the game
var expressions = [
    { expression: '6m - 4 + 2m + 8', answer: '8m+4' },
    { expression: '5x - 2x + 3y - y', answer: '3x+2y' },
    { expression: '7p - 3p + 2q - q', answer: '4p+q' },
    { expression: '2x + 4y - x - 2y', answer: 'x+2y' },
    { expression: '5a + 3b - 2a - b', answer: '3a+2b' },
    { expression: '3m - 2m + 4n - n', answer: 'm+3n' },
    { expression: '10x - 5x + 2y - y', answer: '5x+y' },
];

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Variables to track game progress
var currentQuestion = 0;
var score = 0;
var timeoutId; // Variable to store timeout ID

// Function to initialize the game
function initGame() {
    currentQuestion = 0;
    score = 0;
    expressions = shuffle(expressions); // Shuffle questions
    showQuestion();
}

// Function to display current question
function showQuestion() {
    var question = expressions[currentQuestion].expression;
    document.getElementById('question').textContent = question;
    document.getElementById('progress').textContent = 'Question ' + (currentQuestion + 1) + ' of ' + expressions.length;
    document.getElementById('result').textContent = '';
    document.getElementById('miniGameButton').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'none';

    // Reset the snake game
    resetSnakeGame();
}

// Function to reset the snake game
function resetSnakeGame() {
    var canvas = document.getElementById('gameCanvas');
    var context = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Snake game initialization code
    var snake = {
        x: 160,
        y: 160,
        dx: 16,
        dy: 0,
        cells: [],
        maxCells: 4
    };
    var apple = {
        x: 320,
        y: 320
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function loop() {
        requestAnimationFrame(loop);

        context.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

        if (snake.x < 0) {
            snake.x = canvas.width - 16;
        } else if (snake.x >= canvas.width) {
            snake.x = 0;
        }

        if (snake.y < 0) {
            snake.y = canvas.height - 16;
        } else if (snake.y >= canvas.height) {
            snake.y = 0;
        }

        snake.cells.unshift({ x: snake.x, y: snake.y });

        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, 16 - 1, 16 - 1);

        context.fillStyle = 'green';
        snake.cells.forEach(function (cell, index) {
            context.fillRect(cell.x, cell.y, 16 - 1, 16 - 1);

            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;
                apple.x = getRandomInt(0, 25) * 16;
                apple.y = getRandomInt(0, 25) * 16;
            }

            for (var i = index + 1; i < snake.cells.length; i++) {
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    snake.x = 160;
                    snake.y = 160;
                    snake.cells = [];
                    snake.maxCells = 4;
                    snake.dx = 16;
                    snake.dy = 0;
                    apple.x = getRandomInt(0, 25) * 16;
                    apple.y = getRandomInt(0, 25) * 16;
                }
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 37 && snake.dx === 0) {
            snake.dx = -16;
            snake.dy = 0;
        } else if (e.which === 38 && snake.dy === 0) {
            snake.dy = -16;
            snake.dx = 0;
        } else if (e.which === 39 && snake.dx === 0) {
            snake.dx = 16;
            snake.dy = 0;
        } else if (e.which === 40 && snake.dy === 0) {
            snake.dy = 16;
            snake.dx = 0;
        }
        if ([37, 38, 39, 40].includes(e.which)) {
            e.preventDefault();
        }
    });

    requestAnimationFrame(loop);
}

// Function to normalize answers by removing spaces
function normalizeAnswer(answer) {
    return answer.replace(/\s+/g, '');
}

// Function to check answer
function checkAnswer() {
    var userAnswer = document.getElementById('answer').value.trim();
    var correctAnswer = expressions[currentQuestion].answer;

    if (normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer)) {
        document.getElementById('result').textContent = 'Correct!';
        score++;
        document.getElementById('miniGameButton').style.display = 'block'; // Show mini-game button
    } else {
        document.getElementById('result').textContent = 'Incorrect. The correct answer is ' + correctAnswer;
        setTimeout(nextQuestion, 1000);
    }

    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('answer').value = '';
}

// Function to move to the next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < expressions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Function to start the mini-game
function startMiniGame() {
    document.getElementById('miniGameButton').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    initSnakeGame();

    // Set the timeout for 30 seconds
    timeoutId = setTimeout(() => {
        document.getElementById('gameCanvas').style.display = 'none';
        alert('Time\'s up! Returning to the quiz.');
        nextQuestion();
    }, 30000);
}

// Function to end the game
function endGame() {
    clearTimeout(timeoutId); // Clear the timeout when the game ends
    var percentage = (score / expressions.length) * 100;
    var message = 'Game Over! You scored ' + score + ' out of ' + expressions.length + ' (' + percentage + '%).';
    alert(message);
    initGame(); // Reset the game
}

// Initialize the game on page load
window.onload = initGame;
