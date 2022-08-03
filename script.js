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
});

function getExpressionStack()
{
    let expressionStack = [];
    let tokens = expression.split("");
    let number = "";

    for (let i = 0; i < tokens.length; i++)
    {
        if ((tokens[i] === '-' && tokens[i-1] === undefined) //negative sign at the start
            || (tokens[i] === '-' && tokens[i-1] === '/')
            || (tokens[i] === '-' && tokens[i-1] === '*')
            || (tokens[i] === '-' && tokens[i-1] === '+')
            || (tokens[i] === '-' && tokens[i-1] === '-')) //catch negative sign
        {
            number += tokens[i];
        }
        else if (tokens[i] === "+" || tokens[i] === "-" || tokens[i] === "/" || tokens[i] === "*")
        {
            expressionStack.push(+number);
            number = "";
            expressionStack.push(tokens[i]);
        }
        else if (tokens[i] === '.') //check for dots
        {
            number += tokens[i];
        }
        else if (i != tokens.length -1) //if it's not the last token
        {
            number += tokens[i];
        }
        else //if it's a number and the last element
        {
            number += tokens[i];
            expressionStack.push(+number);
        }
    }

    return expressionStack;
}

function checkSyntaxError()
{
    const illegalChars = /^[\*\/\+\.0-9-]/g;
    //catch if the last token in the expression is not a number or right parantheses
    if (isNaN(+expression.charAt(expression.length -1)) 
        && expression.charAt(expression.length-1) !== ')')
    {
        console.log("Syntax Error 1");
        return true;
    }
    //Check for illegal characters
    else if (!illegalChars.test(expression))
    {
        console.log("Syntax Error 2");
        return true;
    }
    
    const pattern1 = /[\+\*\/]{2,}/g; //consecutive non-minus
    const pattern2 = /[\-][\+\*\/]+/g; //minus followed by anything
    const pattern3 = /[\/\*\+][\-]{2,}/g; //any op followed by more than 1 minus
    const pattern4 = /[0-9]+[.]{2,}/g; //consecutive floating points
    const pattern5 = /[0-9]+[.][0-9]+[.]/g; //repeated floating points

    //check for consecutive operations
    if (pattern1.test(expression)
        || pattern2.test(expression) 
        || pattern3.test(expression)
        || pattern4.test(expression)
        || pattern5.test(expression))
    {
        console.log('syntax error 3');
        return true;
    }

    return false;
}

function evaluateExpression()
{
    if (checkSyntaxError())
    {
        return;
    }

    const expressionStack = getExpressionStack();
    let opStack = [];
    let numStack = [];

    //Unload the expression into the operation and number stacks
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
        }
    }

    //Evaluate final result
    while (opStack.length > 0)
    {
        numStack.push(operate(numStack.pop(), numStack.pop(), opStack.pop()));
    }

    expression = numStack.pop().toPrecision(3); //round to 2 decimal points

    //catch division by zero
    if (expression === Infinity)
    {
        console.log("You just created a blackhole!");
        expression = "";
    }

    //When the expression is evaluated after a calculation it becomes a number
    //all string functions cause an error then
    expression = expression.toString();
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

