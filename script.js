// List of expressions for the game
var expressions = [
    { expression: '6m - 4 + 2m + 8', answer: '8m + 4' },
    { expression: '5x - 2x + 3y - y', answer: '3x + 2y' },
    { expression: '7p - 3p + 2q - q', answer: '4p + q' },
    { expression: '2x + 4y - x - 2y', answer: 'x + 2y' },
    { expression: '5a + 3b - 2a - b', answer: '3a + 2b' },
    { expression: '3m - 2m + 4n - n', answer: 'm + 3n' },
    { expression: '10x - 5x + 2y - y', answer: '5x + y' },
];

// Variables to track game progress
var currentQuestion = 0;
var score = 0;

// Function to initialize the game
function initGame() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Function to display current question
function showQuestion() {
    var question = expressions[currentQuestion].expression;
    document.getElementById('question').textContent = question;
    document.getElementById('progress').textContent = 'Question ' + (currentQuestion + 1) + ' of ' + expressions.length;
}

// Function to check answer
function checkAnswer() {
    var userAnswer = document.getElementById('answer').value.trim();
    var correctAnswer = expressions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById('result').textContent = 'Correct!';
        score++;
    } else {
        document.getElementById('result').textContent = 'Incorrect. The correct answer is ' + correctAnswer;
    }

    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('answer').value = '';

    // Move to the next question or end the game
    currentQuestion++;
    if (currentQuestion < expressions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Function to end the game
function endGame() {
    var percentage = (score / expressions.length) * 100;
    var message = 'Game Over! You scored ' + score + ' out of ' + expressions.length + ' (' + percentage + '%).';
    alert(message);
    initGame(); // Reset the game
}

// Initialize the game on page load
window.onload = initGame;
