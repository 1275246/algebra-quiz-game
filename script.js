const questions = [
    { question: "Simplify: 3x + 5x", answer: "8x" },
    { question: "Simplify: 4y - 2y", answer: "2y" },
    { question: "Simplify: 2a + 3b - a + b", answer: "a + 4b" },
    { question: "Simplify: 6m - 4 + 2m + 8", answer: "8m + 4" },
    { question: "Simplify: 5x - 2x + 3y - y", answer: "3x + 2y" },
    { question: "Simplify: 7p - 3p + 2q - q", answer: "4p + q" },
    { question: "Simplify: 2x + 4y - x - 2y", answer: "x + 2y" },
    { question: "Simplify: 5a + 3b - 2a - b", answer: "3a + 2b" },
    { question: "Simplify: 3m - 2m + 4n - n", answer: "m + 3n" },
    { question: "Simplify: 10x - 5x + 2y - y", answer: "5x + y" }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentQuestionIndex].question;
    updateProgress();
}

function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const resultElement = document.getElementById('result');
    const userAnswer = answerElement.value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
        score++;
    } else {
        resultElement.textContent = `Incorrect, the correct answer is ${correctAnswer}.`;
        resultElement.style.color = "red";
    }

    answerElement.value = '';
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

document.addEventListener('DOMContentLoaded', showQuestion);
