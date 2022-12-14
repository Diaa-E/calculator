# calculator
Calculator project from the Odin project foundations course

*objectives

    *Perform basic operations -> add, subtract, multiply, divide
    *Input is through UI keys
    *Should include clear, delete and = buttons
    *round long decimals to avoid overflow
    *pressing = with missing data causes an error
    *catch division by zero

*bonus

    *Add a floating point button


# DISCARDED 
Handling expressions :

1-Expression is handled in the background then displayed to the user
2-In the background the expression's elements are seperated with semicolons to facilitate handling each element
3- when displayed to the user semicolons are removed

# DISCARDED

*Parsing Expression Algorithm

    -While expression is NOT EMPTY

        -If next token in expression is a number and not the last token
            -Add token to test String
        else if next token in expression is a number and is the last token
            -Add token to test String
            -push number into stack
        -else
            -push number into stack
            -clear number
            -push next token into stack


*Converting expression to postfix algorithm:

    1. While there are still tokens to be read in,
    1.1 Get the next token.
    1.2 If the token is:
        1.2.1 A number: push it onto the value stack.
        1.2.2 A variable: get its value, and push onto the value stack.
        1.2.3 A left parenthesis: push it onto the operator stack.
        1.2.4 A right parenthesis:
            1 While the thing on top of the operator stack is not a 
            left parenthesis,
                1 Pop the operator from the operator stack.
                2 Pop the value stack twice, getting two operands.
                3 Apply the operator to the operands, in the correct order.
                4 Push the result onto the value stack.
            2 Pop the left parenthesis from the operator stack, and discard it.
        1.2.5 An operator (call it thisOp):
            1 While the operator stack is not empty, and the top thing on the
            operator stack has the same or greater precedence as thisOp,
            1 Pop the operator from the operator stack.
            2 Pop the value stack twice, getting two operands.
            3 Apply the operator to the operands, in the correct order.
            4 Push the result onto the value stack.
            2 Push thisOp onto the operator stack.
    2. While the operator stack is not empty,
        1 Pop the operator from the operator stack.
        2 Pop the value stack twice, getting two operands.
        3 Apply the operator to the operands, in the correct order.
        4 Push the result onto the value stack.
    3. At this point the operator stack should be empty, and the value
    stack should have only one value in it, which is the final result.