const timerDiv = document.querySelector('#timer');
const timeEl = document.querySelector('#time');
const startButton = document.querySelector('#start');
const introSection = document.querySelector('#intro');
const questionsSection = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const answersUl = document.querySelector('#answers');
const resultsSection = document.querySelector('#results');
const restartButton = document.querySelector('#restart');

// Global variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score = 0;

const questions = [
	{
		title: 'Commonly used data types DO NOT include:',
		answers: ['strings', 'booleans', 'alerts', 'numbers'],
		correctAnswer: 'alerts',
	},
	{
		title: 'The condition in an if / else statement is enclosed within ____.',
		answers: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
		correctAnswer: 'parentheses',
	},
	{
		title: 'Arrays in JavaScript can be used to store ____.',
		answers: [
			'numbers and strings',
			'other arrays',
			'booleans',
			'all of the above',
		],
		correctAnswer: 'all of the above',
	},
	{
		title:
			'String values must be enclosed within ____ when being assigned to variables.',
		answers: ['commas', 'curly brackets', 'quotes', 'parentheses'],
		correctAnswer: 'quotes',
	},
	{
		title:
			'A very useful tool used during development and debugging for printing content to the debugger is:',
		answers: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
		correctAnswer: 'console.log',
	},
];

// Start the quiz
const startQuiz = () => {
	// Hide the intro section
	introSection.classList.add('hide');

	// Show the questions section
	questionsSection.classList.remove('hide');

	// Start the timer
	startTimer();

	// Show the first question
	showQuestion();
};

// restart the quiz
const restartQuiz = () => {
	// reset the global variables
	resultsSection.classList.add('hide');
	currentQuestionIndex = 0;
	timeLeft = 60;
	score = 0;

	// Hide the questions section
	startQuiz();
};

// Start the timer
const startTimer = () => {
	// Set the timer interval
	timerInterval = setInterval(() => {
		// Decrement the time left
		timeLeft--;

		// Update the timer div
		timeEl.textContent = timeLeft;

		// Check if the user ran out of time
		if (timeLeft <= 0) {
			// Stop the timer
			clearInterval(timerInterval);

			// Show the results
			showResults();
		}
	}, 1000);
};

// Show the next question
const showQuestion = () => {
	// Get the current question
	const currentQuestion = questions[currentQuestionIndex];

	// Update the question title
	questionTitle.textContent = currentQuestion.title;

	// Show the answers
	showAnswers(currentQuestion.answers);
};

// Show the answers
const showAnswers = (answers) => {
	// Clear the answers
	answersUl.innerHTML = '';

	// Loop through the answers
	for (let i = 0; i < answers.length; i++) {
		// Create a new li element
		const li = document.createElement('li');

		// Create a new button element
		const button = document.createElement('button');

		// Add the answer text to the button
		button.textContent = answers[i];

		// Add the answer class to the button
		button.classList.add('answer');

		// Add the answer data attribute to the button
		button.setAttribute('data-answer', answers[i]);

		// Add the button to the li
		li.appendChild(button);

		// Add the li to the ul
		answersUl.appendChild(li);
	}
};

// Check the answer
const checkAnswer = (answer) => {
	// Check if the answer is correct
	if (answer === questions[currentQuestionIndex].correctAnswer) {
		// Increment the current question index
		currentQuestionIndex++;

		// Check if there are more questions
		if (currentQuestionIndex < questions.length) {
			// Show the next question
			showQuestion();
		} else {
			// Stop the timer
			clearInterval(timerInterval);

			// Show the results
			showResults();
		}
	} else {
		// Decrement the time left
		timeLeft -= 10;

		// Update the timer div
		timeEl.textContent = timeLeft;
	}
};

// Show the results
const showResults = () => {
	// Hide the questions section
	questionsSection.classList.add('hide');

	// Show the results section
	resultsSection.classList.remove('hide');

	// Update the score
	score = timeLeft;

	// Update the score
	document.querySelector('#score').textContent = score;

	// check local storage for score to see if it exists and is higher than the current score
	if (localStorage.getItem('highScore') === null) {
		// Set the score to 0
		localStorage.setItem('highScore', 0);
	}

	// Check if the score is higher than the current score
	if (score > localStorage.getItem('highScore')) {
		// Set the score to the current score

		localStorage.setItem('highScore', score);

		// prompt the user for their initials
		let initials = prompt('Please enter your initials');

		if (initials === null) {
			initials = 'Anonymous';
			localStorage.setItem('initials', initials);
		} else {
			// Add the initials to the local storage
			localStorage.setItem('initials', initials);
		}
	}

	// Update the high score and initials
	document.querySelector('#high-score').textContent =
		localStorage.getItem('highScore');

	// Update the initials
	document.querySelector('#initials').textContent =
		localStorage.getItem('initials');
};

// Start the quiz
startButton.addEventListener('click', startQuiz);
// Restart the quiz
restartButton.addEventListener('click', restartQuiz);

// Check the answer
answersUl.addEventListener('click', (e) => {
	// Get the answer data attribute
	const answer = e.target.getAttribute('data-answer');

	// Check the answer
	checkAnswer(answer);
});

// restart the quiz
