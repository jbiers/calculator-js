function add(a, b) {
    if (a == 'Infinity' || b == 'Infinity') {
        return 'Infinity';
    }

    return a + b;
};

function multiply(a, b) {
    if (a == 'Infinity' || b == 'Infinity') {
        return 'Infinity';
    };

    return a * b;
};

function divide(a, b) {
    if (b == 0) {
        return "Infinity";
    };

    if (a == 'Infinity' || b == 'Infinity') {
        return 'Infinity';
    };

    return a / b;
};

function subtract(a, b) {
    if (a == 'Infinity' || b == 'Infinity') {
        return 'Infinity';
    };

    return a - b;
};

const firstNumText = document.getElementById('first-num-text');
const secondNumText = document.getElementById('second-num-text');
const operatorText = document.getElementById('operator-text');

function updateText(toBeChanged, change) {
    if (change == '+' || change == '-' || change == '÷' || change == 'x' || toBeChanged.textContent == '0' || toBeChanged.textContent == '') {
        toBeChanged.textContent = change;
    }

    else if (toBeChanged.textContent == 'Infinity') {
        clearText(firstNumText);
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

// Deal with audio
const audio = document.getElementById('audio');
const audioButton = document.getElementById('audio-button');
let audioOn = false;

function playAudio() {
    if (audioOn) {
        audio.play();
    };
};

function audioClick() {
    audioOn = !audioOn;
};

audioButton.addEventListener('click', () => {
    audioClick();
});


// Deal with pressing numbers
const numbers = Array.from(document.getElementsByClassName('number-key'));
let currentFirstNumber = 0;
let currentSecondNumber = 0;

let operatorClicked = false;

function clickNumber(number) {
    playAudio();

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

document.addEventListener('keypress', event => {
    if (event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
        event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' ||
        event.key == '9' || event.key == '0') {
        clickNumber(Number(event.key));
    };
});

// Dealing with operators
const operators = Array.from(document.getElementsByClassName('operator'));
let currentOperator = ' ';

function clickOperator(operator) {
    playAudio();

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

document.addEventListener('keypress', event => {
    if (event.key == 'x' || event.key == '-' || event.key == '+') {
        clickOperator(event.key);
    }

    else if (event.key == '*') {
        clickOperator('x')
    }

    else if (event.key == '/') {
        event.preventDefault();
        clickOperator('÷');
    }
});

// Handling the equal sign
const equalSign = document.getElementById('equal-sign');

function equalClick() {
    playAudio();

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

        if (currentFirstNumber == 'Infinity') {
            currentFirstNumber = 0;
        }
    }
};
equalSign.addEventListener('click', () => {
    equalClick();
});

document.addEventListener('keypress', event => {
    if (event.key == 'Enter') {
        equalClick();
    };
});

// Handling the clear sign
const clearSign = document.getElementById('clear-sign');

function clearClicked() {
    playAudio();

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

document.addEventListener('keypress', event => {
    if (event.key == 'c' || event.key == 'C') {
        clearClicked();
    };
});

// Handling backspace clicks
const backspaceSign = document.getElementById('backspace-sign');

function backspaceClick() {
    playAudio();

    if (operatorClicked) {
        if ((currentSecondNumber >= 10 || currentSecondNumber <= -10) && secondNumText.textContent != '') {
            clearText(secondNumText);

            currentSecondNumber = ((currentSecondNumber - (currentSecondNumber % 10)) / 10);

            secondNumText.textContent = currentSecondNumber;
        }

        else if ((currentSecondNumber < 10 && currentSecondNumber > -10) && secondNumText.textContent != '') {
            clearText(secondNumText);
            currentSecondNumber = 0;
        }

        else if (currentSecondNumber == 0 && secondNumText.textContent == '') {
            clearText(operatorText);
            operatorClicked = false;
        }
    }

    else {
        if (currentFirstNumber == 0) {
            return;
        }

        else {
            clearText(firstNumText);

            currentFirstNumber = ((currentFirstNumber - (currentFirstNumber % 10)) / 10);

            firstNumText.textContent = currentFirstNumber;
        }
    }
};

backspaceSign.addEventListener('click', () => {
    backspaceClick();
});

document.addEventListener('keydown', event => {
    if (event.key == 'Backspace') {
        backspaceClick();
    }
});