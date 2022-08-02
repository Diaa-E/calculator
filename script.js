"use strict";

let expression = "";

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    write(e.target.getAttribute('data-value'));
}));

const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach(button => button.addEventListener('click', (e) => {
    write(e.target.getAttribute('data-value'));
}));

const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clear);

const delButton = document.querySelector(".delete");
delButton.addEventListener('click', del)

function updateDisplay()
{
    document.querySelector(".display").textContent = expression;
}

function write(newChar)
{
    expression += newChar;
    updateDisplay();
}

function clear()
{
    expression = "";
    updateDisplay();
}

function del()
{
    expression = expression.slice(0, -1);
    updateDisplay();
}

function operate(value1, value2, operation)
{
    switch(operation)
    {
        case '+':
            return add(value1, value2);
        case '-':
            return subtract(value1, value2);
        case '*':
            return multiply(value1, value2);
        case '/':
            return divide(value1, value2);
        default:
            return 'Invalid operation';
    }
}

function add(value1, value2)
{
    return value1 + value2;
}

function subtract(value1, value2)
{
    return value1 - value2;
}

function multiply(value1, value2)
{
    return value1 * value2;
}

function divide(value1, value2)
{
    return value1 / value2;
}

