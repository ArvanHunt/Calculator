const screen = document.getElementById('calculator-screen');
const buttons = document.querySelectorAll('.btn, .clbtn, .clbtno, .btnno2');

let currentInput = '0';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        if (!action) {
            handleNumber(value);
        } else if (action === 'clear') {
            clearScreen();
        } else if (action === 'invert') {
            invertSign();
        } else if (action === 'percent') {
            percent();
        } else if (action === 'equals') {
            calculate();
        } else {
            handleOperator(action);
        }

        updateScreen();
    });
});

function handleNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleOperator(op) {
    if (operator) calculate();
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

function clearScreen() {
    currentInput = '0';
    previousInput = '';
    operator = '';
}

function invertSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
}

function updateScreen() {
    screen.textContent = currentInput;
}
