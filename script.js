function add(a, b) {
    return a + b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b == 0) {
        return "Infinity";
    };

    return a / b;
};

function subtract(a, b) {
    return a - b;
};

const darkModeBtn = document.getElementById('dark-mode-btn');
const lightModeBtn = document.getElementById('light-mode-btn');
const calculator = document.getElementById('calculator');

let darkMode = true;

darkModeBtn.addEventListener("click", () => {
    if (darkMode) {
        return;
    }

    calculator.classList.remove('light-mode');
    calculator.classList.add('dark-mode');

    darkModeBtn.classList.remove('unselected');
    darkModeBtn.classList.add('selected');

    lightModeBtn.classList.remove('selected');
    lightModeBtn.classList.add('unselected');

    darkMode = true;
});

lightModeBtn.addEventListener("click", () => {
    if (!darkMode) {
        return;
    }

    calculator.classList.remove('dark-mode');
    calculator.classList.add('light-mode');

    darkModeBtn.classList.remove('selected');
    darkModeBtn.classList.add('unselected');

    lightModeBtn.classList.remove('unselected');
    lightModeBtn.classList.add('selected');

    darkMode = false;
});
