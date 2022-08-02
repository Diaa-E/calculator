"use strict";

let expression = "";

//number button event
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => button.addEventListener('click', (e) => {
    write(e.target.getAttribute('data-value'));
}));

//operation button event
const operationButtons = document.querySelectorAll(".operation");
operationButtons.forEach(button => button.addEventListener('click', (e) => {
    write(e.target.getAttribute('data-value'));
}));

//clear button event
const clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clear);

//delete button event
const delButton = document.querySelector(".delete");
delButton.addEventListener('click', del)

//evaluate button event
const eqlButton = document.querySelector('.equals');
eqlButton.addEventListener('click', () => {
    evaluateExpression()
    console.log("event works")
});


function evaluateExpression()
{
    //catch if the last entered item is an operation
    if (expression.charAt(expression.length -1) === " ")
    {
        console.log("Syntax Error: Each operator must have 2 operands");
        return
    }

    //each operation is sandwitched by a space on each side
    //!!!!caution: string ending with delimeter adds an empty element to the end of the array
    const expressionStack = expression.split(" "); 
    let opStack = [];
    let numStack = [];

    while (expressionStack.length > 0)
    {
        if (expressionStack[expressionStack.length -1] === '+' 
            || expressionStack[expressionStack.length -1] === '-'
            || expressionStack[expressionStack.length -1] === '*'
            || expressionStack[expressionStack.length -1] === '/')
        {
            if (opStack.length > 0 && 
                evaluatePrecedence(opStack[opStack.length -1]) 
                >= evaluatePrecedence(expressionStack[expressionStack.length-1]))
            {
                numStack.push(operate(numStack.pop(), numStack.pop(), opStack.pop()));
                opStack.push(expressionStack.pop());
            }
            else
            {
                opStack.push(expressionStack.pop());
            }
        }
        else
        {
            numStack.push(+expressionStack.pop());
            console.log(numStack)
        }
    }

    while (opStack.length > 0)
    {
        numStack.push(operate(numStack.pop(), numStack.pop(), opStack.pop()));
    }

    expression = numStack.pop();
    updateDisplay();
}

function evaluatePrecedence(operation)
{
    switch (operation)
    {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
    }
}

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
    if (expression.charAt(expression.length -1) === " ")
    {
        expression = expression.slice(0, -3); //remove the operation and its surrounding space
        updateDisplay();
    }
    else
    {
        expression = expression.slice(0, -1);
        updateDisplay();
    }
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

