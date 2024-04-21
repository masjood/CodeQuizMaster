let userAnswers = [];
let currentQuestionIndex = 0;
let totalQuestions = 10; // Assuming you have 10 questions pre-determined

document.addEventListener('DOMContentLoaded', () => {
    loadQuizQuestion();
});

function loadQuizQuestion() {
    const questionElement = document.querySelector('.question h2');
    const answersElement = document.querySelector('.answers');
    const nextButton = document.querySelector('.next-button');

    // Simulate fetching data
    let questionData = getQuestionData(currentQuestionIndex); // This function needs to be defined or replaced with actual data fetching

    questionElement.textContent = questionData.question;
    answersElement.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        let answerElement = document.createElement('li');
        answerElement.textContent = answer;let userAnswers = [];
        let currentQuestionIndex = 0;
        let totalQuestions = 10; // Adjust if the number of questions varies
        
        document.addEventListener('DOMContentLoaded', () => {
            const quizTopic = determineQuizTopic();
            loadQuizQuestion(quizTopic);
        });
        
        function determineQuizTopic() {
            const pathName = window.location.pathname;
            return pathName.split('/').pop().replace('.html', '');
        }
        
        function loadQuizQuestion(quizTopic) {
            const questionElement = document.querySelector('.question h2');
            const answersElement = document.querySelector('.answers');
            const nextButton = document.querySelector('.next-button');
        
            fetch(`/api/questions/${quizTopic}/${currentQuestionIndex}`)
                .then(response => response.json())
                .then(questionData => {
                    displayQuestionAndAnswers(questionData, questionElement, answersElement);
                    setupNextButton(nextButton, quizTopic);
                })
                .catch(error => {
                    console.error('Error loading the quiz question:', error);
                    answersElement.innerHTML = '<li>Error loading questions. Please try again later.</li>';
                });
        }
        
        function displayQuestionAndAnswers(questionData, questionElement, answersElement) {
            questionElement.textContent = questionData.question;
            answersElement.innerHTML = '';
            questionData.answers.forEach((answer, index) => {
                let answerElement = document.createElement('li');
                answerElement.textContent = answer;
                answerElement.onclick = () => selectAnswer(index);
                answersElement.appendChild(answerElement);
            });
        }
        
        function setupNextButton(nextButton, quizTopic) {
            if (currentQuestionIndex === totalQuestions - 1) {
                nextButton.textContent = 'See Results';
                nextButton.onclick = () => finishQuiz(quizTopic);
            } else {
                nextButton.textContent = 'Next';
                nextButton.onclick = () => selectAnswer(null, quizTopic);
            }
        }
        
        function selectAnswer(answerIndex, quizTopic) {
            if (answerIndex !== null) {
                userAnswers[currentQuestionIndex] = answerIndex;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                loadQuizQuestion(quizTopic);
            } else {
                finishQuiz(quizTopic);
            }
        }
        
        function finishQuiz(quizTopic) {
            localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
            localStorage.setItem('quizTopic', quizTopic);
            window.location.href = 'results.html';
        }
        
        answerElement.onclick = () => selectAnswer(index);
        answersElement.appendChild(answerElement);
    });

    if (currentQuestionIndex === totalQuestions - 1) {
        nextButton.textContent = 'See Results';
        nextButton.onclick = finishQuiz;
    } else {
        nextButton.textContent = 'Next';
        nextButton.onclick = () => selectAnswer(null); // move to next question
    }
}

function selectAnswer(answerIndex) {
    if (answerIndex !== null) {
        userAnswers[currentQuestionIndex] = answerIndex;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        loadQuizQuestion();
    }
}

function finishQuiz() {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    window.location.href = 'results.html'; // Adjust the URL if needed
}

// Dummy function to simulate fetching questions and answers
function getQuestionData(index) {
    // Replace this with your actual data fetching logic
    return {
        question: `Question ${index + 1}`,
        answers: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
    };
}
