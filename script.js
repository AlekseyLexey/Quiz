const mailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const cards = document.querySelectorAll(".card");
const progressBars = document.querySelectorAll("progress");
const data = {
  q1: null,
  q2: [],
  q3: [],
  q4: {
    name: "",
    surname: "",
    email: ""
  }
};

main();

function main() {
  startCard(1);
  setProgressBar();
}

function setProgressBar() {
  let progressValue = 0;

  if (data.q1) {
    progressValue++;
  }
  if (data.q2.length) {
    progressValue++;
  }
  if (data.q3.length) {
    progressValue++;
  }
  if (data.q4.name) {
    progressValue++;
  }
  if (data.q4.surname) {
    progressValue++;
  }
  if (data.q4.email) {
    progressValue++;
  }

  for (const item of progressBars) {
    const completeValue = (progressValue / 6) * 100;
    if (!completeValue) {
      item.nextElementSibling.style.display = "none";
    } else {
      item.nextElementSibling.style.display = "";
    }
    item.nextElementSibling.textContent = `${Math.ceil(completeValue)}%`;
    item.nextElementSibling.style.width = `${completeValue}%`;
    item.value = `${completeValue}`;
  }
}

function toggleItem(array, item) {
  const index = array.indexOf(item);

  if (index === -1) {
    array.push(item);
    return true;
  }

  array.splice(index, 1);
  return false;
}

function startCard(number) {
  const card = document.querySelector(`.card[data-step='${number}']`);

  if (!card) {
    return;
  }

  cards.forEach((card) => {
    card.classList.remove("_active");
  });
  card.classList.add("_active");

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

function initStep_01() {
  const startButton = document.querySelector(".button-bg[data-start]");

  startButton.addEventListener("click", () => startCard(2));
}

function initStep_02() {
  const card = document.querySelector('.card[data-step="2"]');
  const toNextButton = card.querySelector('.button[data-button="toNext"]');
  const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
  const values = card.querySelectorAll(".variant-inline[data-value]");

  toNextButton.disabled = true;

  toNextButton.addEventListener("click", () => startCard(3));
  toPrevButton.addEventListener("click", () => startCard(1));

  values.forEach((value) => {
    value.addEventListener("click", clickValueHandler);
  });

  function clickValueHandler() {
    data.q1 = this.dataset.value;
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;
    if (data.q1) {
      toNextButton.disabled = false;
    }
    setProgressBar();
  }
}

function initStep_03() {
  const card = document.querySelector('.card[data-step="3"]');
  const toNextButton = card.querySelector('.button[data-button="toNext"]');
  const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
  const values = card.querySelectorAll(".variant-inline[data-value]");

  toNextButton.disabled = true;

  toNextButton.addEventListener("click", () => startCard(4));
  toPrevButton.addEventListener("click", () => startCard(2));

  values.forEach((value) => {
    value.addEventListener("click", clickValueHandler);
  });

  function clickValueHandler() {
    const { value } = this.dataset;
    const radio = this.querySelector('input[type="checkbox"]');
    radio.checked = toggleItem(data.q2, value);

    toNextButton.disabled = Boolean(!data.q2.length);
    setProgressBar();
  }
}

function initStep_04() {
  const card = document.querySelector('.card[data-step="4"]');
  const toNextButton = card.querySelector('.button[data-button="toNext"]');
  const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
  const values = card.querySelectorAll(".variant-square[data-value]");

  toNextButton.disabled = true;

  toNextButton.addEventListener("click", () => startCard(5));
  toPrevButton.addEventListener("click", () => startCard(3));

  values.forEach((value) => {
    value.addEventListener("click", clickValueHandler);
  });

  function clickValueHandler() {
    const { value } = this.dataset;
    toggleItem(data.q3, value);

    this.classList.toggle("variant-square--active");
    toNextButton.disabled = Boolean(!data.q3.length);
    setProgressBar();
  }
}

function initStep_05() {
  const card = document.querySelector('.card[data-step="5"]');
  const toNextButton = card.querySelector('.button[data-button="toNext"]');
  const toPrevButton = card.querySelector('.button[data-button="toPrev"]');
  const inputs = card.querySelectorAll(".variant-form [data-field]");

  toNextButton.disabled = true;

  toNextButton.addEventListener("click", () => startCard(6));
  toPrevButton.addEventListener("click", () => startCard(4));

  inputs.forEach((input) => {
    input.addEventListener("input", inputValueHandler);
  });

  function inputValueHandler() {
    const { field } = this.dataset;
    if (field !== "email") {
      data.q4[field] = this.value;
    } else if (field === "email") {
      if (mailRe.test(this.value)) {
        data.q4[field] = this.value;
      } else {
        data.q4[field] = "";
      }
    }

    let flag = false;

    for (const key in data.q4) {
      if (!data.q4[key]) {
        flag = true;
        break;
      }
    }

    toNextButton.disabled = flag;
    setProgressBar();
  }
}

function initStep_06() {
  const card = document.querySelector('.card[data-step="6"]');
  const emailMessage = card.querySelector(".card-text");
  emailMessage.textContent = `Проверь свою почту: ${
    data.q4.email ? data.q4.email : "my@mail.ru"
  }`;
}
