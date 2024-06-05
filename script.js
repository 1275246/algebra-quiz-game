const questions = [
    { question: "Solve for x: 2x + 3 = 7", answer: "2" },
    { question: "Solve for x: x^2 - 4 = 0", answer: "2" },
    { question: "Solve for x: 3x - 5 = 1", answer: "2" },
];

let currentQuestionIndex = 0;

function showQuestion() {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questions[currentQuestionIndex].question;
}

function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const resultElement = document.getElementById('result');
    const userAnswer = answerElement.value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect, try again.";
    }

    answerElement.value = '';
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
}

document.addEventListener('DOMContentLoaded', showQuestion);
