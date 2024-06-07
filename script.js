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

// Function to initialize the game
function initGame() {
    try {
        currentQuestion = 0;
        score = 0;
        expressions = shuffle(expressions); // Shuffle questions
        showQuestion();
    } catch (error) {
        console.error("Error initializing the game:", error);
    }
}

// Function to display current question
function showQuestion() {
    try {
        var question = expressions[currentQuestion].expression;
        document.getElementById('question').textContent = question;
        document.getElementById('progress').textContent = 'Question ' + (currentQuestion + 1) + ' of ' + expressions.length;
        document.getElementById('result').textContent = '';
        document.getElementById('miniGameButton').style.display = 'none';
        document.getElementById('gameCanvas').style.display = 'none';
    } catch (error) {
        console.error("Error showing the question:", error);
    }
}

// Function to normalize answers by removing spaces
function normalizeAnswer(answer) {
    return answer.replace(/\s+/g, '');
}

// Function to check answer
function checkAnswer() {
    try {
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
    } catch (error) {
        console.error("Error checking the answer:", error);
    }
}

// Function to move to the next question
function nextQuestion() {
    try {
        currentQuestion++;
        if (currentQuestion < expressions.length) {
            showQuestion();
        } else {
            endGame();
        }
    } catch (error) {
        console.error("Error moving to the next question:", error);
    }
}

// Function to start the mini-game
function startMiniGame() {
    try {
        document.getElementById('miniGameButton').style.display = 'none';
        document.getElementById('gameCanvas').style.display = 'block';
        document.getElementById('result').textContent = 'Enjoy the mini-game!';
    } catch (error) {
        console.error("Error starting the mini-game:", error);
    }
}

// Function to end the game
function endGame() {
    try {
        var percentage = (score / expressions.length) * 100;
        var message = 'Game Over! You scored ' + score + ' out of ' + expressions.length + ' (' + percentage + '%).';
        alert(message);
        initGame(); // Reset the game
    } catch (error) {
        console.error("Error ending the game:", error);
    }
}

// Initialize the game on page load
window.onload = initGame;
