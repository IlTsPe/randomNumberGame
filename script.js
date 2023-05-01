'use strict';

const input = document.querySelector('.number-input'),
	check = document.querySelector('.check'),
	again = document.querySelector('.again'),
	guessMS = document.querySelector('.guess-message'),
	question = document.querySelector('.question'),
	scoreInner = document.querySelector('.score'),
	highscore = document.querySelector('.highscore'),
	body = document.querySelector('body');

let score = 20;


function generator() {
	let number = Math.trunc((Math.random() * 20) + 1);
	return number;
}

let secretNumber = generator();
console.log(secretNumber);

function setAttribute() {
	question.style.width = '50rem';
	check.setAttribute('disabled', '');
	input.setAttribute('disabled', '');
}

function userWin() {
	guessMS.textContent = 'Правильно!';
	question.textContent = input.value;
	body.style.backgroundColor = 'rgb(24, 183, 32)';
	setAttribute();
}

function criticalBalance() {
	input.addEventListener('input', function () {
		if (input.value > 20 || input.value <= Number(0)) {
			this.style.color = 'red';
			this.style.borderColor = 'red';
			check.setAttribute('disabled', '');
			question.textContent = 'от 1 до 20';
		} else {
			this.style.color = 'white';
			this.style.borderColor = 'white';
			check.removeAttribute('disabled', '');
			question.textContent = '???';
		}
		this.value == '' ? (this.style.borderColor = 'white', this.style.color = 'white') : false;
	})
}

criticalBalance();

check.addEventListener('click', () => {
	if (score > 1) {
		input.style.borderColor = 'white'
		input.value > secretNumber ? guessMS.textContent = 'Много!' : guessMS.textContent = 'Мало!';
		if (input.value == secretNumber) {
			userWin();
			Number(scoreInner.textContent) >= Number(highscore.textContent) ? highscore.textContent = scoreInner.textContent : false;
			localStorage.setItem('bestScore', highscore.textContent);
		} else {
			score--;
		}
		scoreInner.textContent = score;
	} else {
		guessMS.textContent = 'Вы проиграли!';
		scoreInner.textContent = '0';
		question.textContent = secretNumber;
		body.style.backgroundColor = 'rgb(181, 25, 25)';
		setAttribute();
	}
});

again.addEventListener('click', () => {
	question.textContent = '???';
	question.style.width = '25rem';
	input.value = 1;
	check.removeAttribute('disabled');
	input.removeAttribute('disabled', '');
	guessMS.textContent = 'Начни угадывать';
	scoreInner.textContent = '20';
	body.style.backgroundColor = 'rgb(0, 0, 0)';
	secretNumber = generator();
	score = 20;
	console.log(secretNumber);
})


document.querySelector('.remove').addEventListener('click', () => {
	localStorage.removeItem('bestScore');
	highscore.textContent = 0;
});

if (localStorage.getItem('bestScore')) {
	highscore.textContent = localStorage.getItem('bestScore')
}