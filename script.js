const mailRe =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cards = document.querySelectorAll('.card');
const progressBars = document.querySelectorAll('progress');

main();

function main() {
	startCard(1);
	setProgressBar();
}

function startCard(number) {
	const card = document.querySelector(`.card[data-step='${number}']`);

	if (!card) {
		return;
	}

	cards.forEach(card => {
		card.classList.remove('_active');
	});
	card.classList.add('_active');

	if (card.dataset.inited) {
		return;
	}

	card.dataset.inited = true;

	if (number === 1) {
		initStep_01();
	} else if (number === 2) {
		initStep_02();
	} else if (number === 3) {
		initStep_03();
	} else if (number === 4) {
		initStep_04();
	} else if (number === 5) {
		initStep_05();
	} else if (number === 6) {
		initStep_06();
	}
}

function setProgressBar() {
	let progressValue = 0;

	const cardTwo = document.querySelector('.card[data-step="2"]');
	const inputnsCardTwo = cardTwo.querySelectorAll('input[type="radio"]');

	for (const { checked } of inputnsCardTwo) {
		if (checked) {
			progressValue++;
			break;
		}
	}

	const cardThree = document.querySelector('.card[data-step="3"]');
	const inputnsCardThree = cardThree.querySelectorAll('input[type="checkbox"]');

	for (const { checked } of inputnsCardThree) {
		if (checked) {
			progressValue++;
			break;
		}
	}

	const cardFour = document.querySelector('.card[data-step="4"]');
	const values = cardFour.querySelectorAll('.variant-square[data-value]');

	for (const value of values) {
		if (value.classList.contains('variant-square--active')) {
			progressValue++;
			break;
		}
	}

	const cardFive = document.querySelector('.card[data-step="5"]');
	const inputsCardFive = cardFive.querySelectorAll('.variant-form [data-field]');

	const flags = Array(inputsCardFive.length).fill(false);

	for (let i = 0; i < inputsCardFive.length; i++) {
		if (inputsCardFive[i].dataset.field === 'email') {
			if (mailRe.test(inputsCardFive[i].value)) {
				flags[i] = true;
			}
		} else {
			if (inputsCardFive[i].value) {
				flags[i] = true;
			}
		}
	}

	for (const value of flags) {
		if (value) {
			progressValue++;
		}
	}

	for (const item of progressBars) {
		const completeValue = progressValue / 6 * 100;
		if (!completeValue) {
			item.nextElementSibling.style.display = 'none';
		} else {
			item.nextElementSibling.style.display = '';
		}
		item.nextElementSibling.textContent = `${Math.ceil(completeValue)}%`;
		item.nextElementSibling.style.width = `${completeValue}%`;
		item.value = `${completeValue}`;
	}
}

function initStep_01() {
	const startButton = document.querySelector('.button-bg[data-start]');

	startButton.addEventListener('click', () => startCard(2));
}

function initStep_02() {
	const card = document.querySelector('.card[data-step="2"]');
	const toNextButton = card.querySelector('.button[data-button="toNext"]');
	const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
	const values = card.querySelectorAll('.variant-inline[data-value]');

	toNextButton.disabled = true;

	toNextButton.addEventListener('click', () => startCard(3));
	toPrevButton.addEventListener('click', () => startCard(1));

	values.forEach(value => {
		value.addEventListener('click', clickValueHandler);
	});

	function clickValueHandler() {
		const radio = this.querySelector('input[type="radio"]');
		radio.checked = true;
		toNextButton.disabled = false;
		setProgressBar();
	}
}

function initStep_03() {
	const card = document.querySelector('.card[data-step="3"]');
	const toNextButton = card.querySelector('.button[data-button="toNext"]');
	const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
	const values = card.querySelectorAll('.variant-inline[data-value]');
	const inputs = card.querySelectorAll('input[type="checkbox"]');

	toNextButton.disabled = true;

	toNextButton.addEventListener('click', () => startCard(4));
	toPrevButton.addEventListener('click', () => startCard(2));

	values.forEach(value => {
		value.addEventListener('click', clickValueHandler);
	});

	function clickValueHandler(e) {
		const radio = this.querySelector('input[type="checkbox"]');
		if (e.target !== radio) {
			if (radio.checked) {
				radio.checked = false;
			} else {
				radio.checked = true;
			}
		}

		let flag = true;

		for (const { checked } of inputs) {
			if (checked) {
				flag = false;
				break;
			}
		}

		toNextButton.disabled = flag;
		setProgressBar();
	}
}

function initStep_04() {
	const card = document.querySelector('.card[data-step="4"]');
	const toNextButton = card.querySelector('.button[data-button="toNext"]');
	const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
	const values = card.querySelectorAll('.variant-square[data-value]');

	toNextButton.disabled = true;

	toNextButton.addEventListener('click', () => startCard(5));
	toPrevButton.addEventListener('click', () => startCard(3));

	values.forEach(value => {
		value.addEventListener('click', clickValueHandler);
	});

	function clickValueHandler() {
		this.classList.toggle('variant-square--active');

		let flag = true;

		for (const item of values) {
			if (item.classList.contains('variant-square--active')) {
				flag = false;
				break;
			}
		}

		toNextButton.disabled = flag;
		setProgressBar();
	}
}

function initStep_05() {
	const card = document.querySelector('.card[data-step="5"]');
	const toNextButton = card.querySelector('.button[data-button="toNext"]');
	const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
	const inputs = card.querySelectorAll('.variant-form [data-field]');

	toNextButton.disabled = true;

	toNextButton.addEventListener('click', () => startCard(6));
	toPrevButton.addEventListener('click', () => startCard(4));

	inputs.forEach(input => {
		input.addEventListener('input', inputValueHandler);
	});

	function inputValueHandler() {
		const flags = Array(inputs.length).fill(false);
		let flag = true;

		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].dataset.field === 'email') {
				if (mailRe.test(inputs[i].value)) {
					flags[i] = true;
				}
			} else {
				if (inputs[i].value) {
					flags[i] = true;
				}
			}
		}

		if (!flags.includes(false)) {
			flag = false;
		}

		toNextButton.disabled = flag;
		setProgressBar();
	}
}

function initStep_06() {
	const card = document.querySelector('.card[data-step="6"]');
	const emailMessage = card.querySelector('.card-text');
	const emailInput = document.querySelector('.card[data-step="5"] [data-field="email"]');
	emailMessage.textContent = `Проверь свою почту: ${emailInput.value ? emailInput.value : 'my@mail.ru'}`;
}