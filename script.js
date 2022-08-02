"use strict";

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

