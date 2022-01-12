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

function resolveEquation(operator) {
    if (previousOperator == '+') {
        currentFirstNumber = add(currentFirstNumber, currentSecondNumber);
        currentSecondNumber = 0;

        previousOperator = operator;

        // show total on screen
        console.log(currentFirstNumber);
    }

    else if (previousOperator == '-') {
        currentFirstNumber = subtract(currentFirstNumber, currentSecondNumber);
        currentSecondNumber = 0;

        previousOperator = operator;

        // show total on screen
        console.log(currentFirstNumber);
    }

    else if (previousOperator == '÷') {
        currentFirstNumber = divide(currentFirstNumber, currentSecondNumber);
        currentSecondNumber = 0;

        previousOperator = operator;

        // show total on screen
        console.log(currentFirstNumber);
    }

    else {
        currentFirstNumber = multiply(currentFirstNumber, currentSecondNumber);
        currentSecondNumber = 0;

        previousOperator = operator;

        // show total on screen
        console.log(currentFirstNumber);
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
let currentOperator = ' ';
let previousOperator = ' ';
let operatorIsOn = false;

function clickNumber(number) {
    if (operatorIsOn) {
        currentSecondNumber = (currentSecondNumber * 10) + number;

        // update screen to show current second number
        console.log(currentSecondNumber);
    }

    else {
        currentFirstNumber = (currentFirstNumber * 10) + number;

        // update screen to show current first number
        console.log(currentFirstNumber);
    }
};

numbers.forEach(number => {
    number.addEventListener('click', () => {
        clickNumber(Number(number.textContent));
    });
});

// Deal with pressing operators
const operators = Array.from(document.getElementsByClassName('operator'));

function clickOperator(operator) {
    if (operatorIsOn) {
        resolveEquation(operator);
    }
    // test
    else {
        // update screen to add operator
        console.log(operator);

        previousOperator = operator;
        operatorIsOn = true;
    }
};

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        clickOperator(operator.textContent);
    });
});

// Deal with equal sign pressing
const equalSign = document.getElementById('equal-sign');

equalSign.addEventListener('click', () => {
    resolveEquation
})

