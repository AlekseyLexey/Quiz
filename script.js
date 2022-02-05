import initStore from "./store.js";
const cards = document.querySelectorAll('.card');
const progresses = document.querySelectorAll('progress');
initStore();
main();

function main() {
	startStep(1);
	store.updateProgress(updateProgressBar);
}

function updateProgressBar(progressValue) {
	const progressPercent = progressValue / 6 * 100;
	for (const progress of progresses) {
		if (!progressPercent) {
			progress.nextElementSibling.style.display = 'none';
		} else {
			progress.nextElementSibling.style.display = '';
		}
		progress.nextElementSibling.textContent = `${Math.ceil(progressPercent)}%`;
		progress.nextElementSibling.style.width = `${progressPercent}%`;
		progress.value = `${progressPercent}`;
	}
}

function startStep(number) {
	const card = document.querySelector(`.card[data-step='${number}']`);

	if (!card) {
		return;
	}

	for (const card of cards) {
		card.classList.remove('_active');
	}
	card.classList.add('_active');

	if (card.dataset.init) {
		return;
	}

	card.dataset.init = true;

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

function initStep_01() {
	const button = document.querySelector('button[data-start]');

	button.addEventListener('click', () => startStep(2));
}

function initStep_02() {
	const card = document.querySelector(`.card[data-step='2']`);
	const toPrevButton = card.querySelector('button[data-button="toPrev"]');
	const toNextButton = card.querySelector('button[data-button="toNext"]');
	const values = card.querySelectorAll('.variant-inline[data-value]');
	toPrevButton.addEventListener('click', () => startStep(1));
	toNextButton.addEventListener('click', () => startStep(3));

	toNextButton.disabled = true;

	values.forEach(value => {
		value.addEventListener('click', () => {
			store.updateData(value, 'q1', clickEventHandler);
		});
	});

	function clickEventHandler(item) {
		const radio = item.querySelector('input[type="radio"]');

		radio.checked = true;
		toNextButton.disabled = false;
		store.updateProgress(updateProgressBar);
	}
}

function initStep_03() {
	const card = document.querySelector(`.card[data-step='3']`);
	const toPrevButton = card.querySelector('button[data-button="toPrev"]');
	const toNextButton = card.querySelector('button[data-button="toNext"]');
	const values = card.querySelectorAll('.variant-inline[data-value]');

	toPrevButton.addEventListener('click', () => startStep(2));
	toNextButton.addEventListener('click', () => startStep(4));

	toNextButton.disabled = true;

	values.forEach(value => {
		value.addEventListener('click', () => {
			store.updateData(value, 'q2', clickEventHandler);
		});
	});

	function clickEventHandler(item, data, key) {
		const checkbox = item.querySelector('input[type="checkbox"]');

		if (data[key].length) {
			toNextButton.disabled = false;
		} else {
			toNextButton.disabled = true;
		}
		checkbox.checked = !checkbox.checked;
		store.updateProgress(updateProgressBar);
	}
}

function initStep_04() {
	const card = document.querySelector(`.card[data-step='4']`);
	const toPrevButton = card.querySelector('button[data-button="toPrev"]');
	const toNextButton = card.querySelector('button[data-button="toNext"]');
	const values = card.querySelectorAll('.variant-square[data-value]');

	toPrevButton.addEventListener('click', () => startStep(3));
	toNextButton.addEventListener('click', () => startStep(5));

	toNextButton.disabled = true;

	values.forEach(value => {
		value.addEventListener('click', () => {
			store.updateData(value, 'q3', clickEventHandler);
		});
	});

	function clickEventHandler(item, data, key) {
		item.classList.toggle('variant-square--active');

		if (data[key].length) {
			toNextButton.disabled = false;
		} else {
			toNextButton.disabled = true;
		}
		store.updateProgress(updateProgressBar);
	}
}

function initStep_05() {
	const card = document.querySelector(`.card[data-step='5']`);
	const toPrevButton = card.querySelector('button[data-button="toPrev"]');
	const toNextButton = card.querySelector('button[data-button="toNext"]');
	const formInputs = card.querySelectorAll('input[data-field]');

	toPrevButton.addEventListener('click', () => startStep(4));
	toNextButton.addEventListener('click', () => startStep(6));

	toNextButton.disabled = true;

	formInputs.forEach(input => {
		input.addEventListener('input', () => {
			store.updateData(input, 'q4', clickEventHandler, input.dataset.field);
		});
	});

	function clickEventHandler(item, data, key) {
		let flag = false;
		for (const subkey in data[key]) {
			if (!data[key][subkey]) {
				flag = true;
				break;
			}
		}
		toNextButton.disabled = flag;
		store.updateProgress(updateProgressBar);
	}
}

function initStep_06() {
	const emailMassage = document.querySelector('.card[data-step="6"] .card-text');
	emailMassage.textContent = `Проверь свою почту: ${store.getData().q4.email}`;
}