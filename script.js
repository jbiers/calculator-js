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

const firstNumText = document.getElementById('first-num-text');
const secondNumText = document.getElementById('second-num-text');
const operatorText = document.getElementById('operator-text');

function updateText(toBeChanged, change) {
    if (change == '+' || change == '-' || change == '÷' || change == 'x' || toBeChanged.textContent == '0' || toBeChanged.textContent == '') {
        toBeChanged.textContent = change;
    }

    else {
        toBeChanged.textContent = toBeChanged.textContent + change;
    }
};

function clearText(toBeCleared) {
    toBeCleared.textContent = '';
}

function solve(a, b, operator) {
    if (operator == '+') {
        return add(a, b);
    }

    else if (operator == '-') {
        return subtract(a, b)
    }

    else if (operator == '÷') {
        return divide(a, b);
    }

    else if (operator == 'x') {
        return multiply(a, b);
    }
};

// Deal with theme changes
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

// Deal with pressing numbers
const numbers = Array.from(document.getElementsByClassName('number-key'));
let currentFirstNumber = 0;
let currentSecondNumber = 0;

let operatorClicked = false;

function clickNumber(number) {
    if (operatorClicked) {
        currentSecondNumber = (currentSecondNumber * 10) + number;

        updateText(secondNumText, number);
    }

    else {
        currentFirstNumber = (currentFirstNumber * 10) + number;

        updateText(firstNumText, number);
    }
};

numbers.forEach(number => {
    number.addEventListener('click', () => {
        clickNumber(Number(number.textContent));
    });
});

// Dealing with operators
const operators = Array.from(document.getElementsByClassName('operator'));
let currentOperator = ' ';

function clickOperator(operator) {
    if (!operatorClicked) {
        currentOperator = operator;
        operatorClicked = true;

        updateText(operatorText, operator);
    }

    else {
        currentFirstNumber = solve(currentFirstNumber, currentSecondNumber, currentOperator);
        currentSecondNumber = 0;

        clearText(firstNumText);
        clearText(secondNumText);
        clearText(operatorText);

        currentOperator = operator;
        updateText(operatorText, currentOperator);
        updateText(firstNumText, currentFirstNumber);
    }
};

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        clickOperator(operator.textContent);
    });
});

// Handling the equal sign
const equalSign = document.getElementById('equal-sign');

equalSign.addEventListener('click', () => {
    if (!operatorClicked) {
        return;
    }

    else {
        operatorClicked = false;

        currentFirstNumber = solve(currentFirstNumber, currentSecondNumber, currentOperator);
        currentSecondNumber = 0;

        clearText(firstNumText);
        clearText(secondNumText);
        clearText(operatorText);

        updateText(firstNumText, currentFirstNumber);
    }
});

// Handling the clear sign
const clearSign = document.getElementById('clear-sign');

function clearClicked() {
    currentFirstNumber = 0;
    currentSecondNumber = 0;
    operatorClicked = false;

    clearText(firstNumText);
    clearText(secondNumText);
    clearText(operatorText);

    updateText(firstNumText, 0);
}

clearSign.addEventListener('click', () => {
    clearClicked();
});