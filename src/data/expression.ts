class Token {

}

class Operand extends Token {

}

class Variable extends Operand {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}

class Value extends Operand {
    value: any;

    constructor(value: any) {
        super();
        this.value = value;
    }
}

abstract class Operator extends Token {
    precedence: number;

    constructor(precedence: number) {
        super();
        this.precedence = precedence;
    }

    abstract evaluate(valueStack: Value[]): Value;
}

class Parentheses extends Token {

}

class LeftParentheses extends Parentheses {
}

class RightParentheses extends Parentheses {
}

abstract class UnaryOperator extends Operator {
}

class NegateOperator extends UnaryOperator {
    constructor() {
        super(15);
    }

    evaluate(valueStack: Value[]): Value {
        const operand = valueStack.pop()!;
        return new Value(!operand.value as boolean)
    }
}

abstract class BinaryOperator extends Operator {

}

class EqualsOperator extends BinaryOperator {
    constructor() {
        super(9);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value === op2.value);
    }
}

class NotEqualsOperator extends BinaryOperator {
    constructor() {
        super(9);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value !== op2.value);
    }
}

class OrOperator extends BinaryOperator {
    constructor() {
        super(4);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value || op2.value);
    }
}

class AndOperator extends BinaryOperator {
    constructor() {
        super(5);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value && op2.value);
    }
}

class LessThanOperator extends BinaryOperator {
    constructor() {
        super(10);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value < op2.value);
    }
}

class LessThanEqualsOperator extends BinaryOperator {
    constructor() {
        super(10);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value <= op2.value);
    }
}

class GreaterThanOperator extends BinaryOperator {
    constructor() {
        super(10);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value > op2.value);
    }
}

class GreaterThanEqualsOperator extends BinaryOperator {
    constructor() {
        super(10);
    }

    evaluate(valueStack: Value[]): Value {
        const op2 = valueStack.pop()!;
        const op1 = valueStack.pop()!;
        return new Value(op1.value >= op2.value);
    }
}


function* parseExpression(expression: string) {
    for (let i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case " ":
            case "\t":
                continue;
            case "(":
                yield new LeftParentheses();
                break;
            case ")":
                yield new RightParentheses();
                break;
            case "!":
                if (expression[i + 1] === "=") {
                    i++;
                    yield new NotEqualsOperator();
                } else {
                    yield new NegateOperator();
                }
                break;
            case "=":
                i++;
                yield new EqualsOperator();
                break;
            case "|":
                i++;
                yield new OrOperator();
                break;
            case "&":
                i++;
                yield new AndOperator();
                break;
            case "<":
                if (expression[i + 1] === "=") {
                    i++;
                    yield new LessThanEqualsOperator();
                } else {
                    yield new LessThanOperator();
                }
                break;
            case ">":
                if (expression[i + 1] === "=") {
                    i++;
                    yield new GreaterThanEqualsOperator();
                } else {
                    yield new GreaterThanOperator();
                }
                break;
            default:
                if (expression[i] === "." || (expression[i] >= "0" && expression[i] <= "9")) {
                    let raw = expression[i];
                    for (; i + 1 < expression.length && /[0-9.]/.test(expression[i + 1]); i++) {
                        raw += expression[i + 1];
                    }
                    yield new Value(parseFloat(raw));
                } else {
                    let name = expression[i];
                    for (; i + 1 < expression.length && /[a-zA-Z_]/.test(expression[i + 1]); i++) {
                        name += expression[i + 1];
                    }
                    yield new Variable(name);
                }
        }
    }
}

export function evaluateBooleanExpression(expression: string, settings: {[key: string]: any}): boolean {
    const stack: (Operator | Parentheses)[] = [];
    const output: Token[] = [];
    const generator = parseExpression(expression);

    let result;
    while (!(result = generator.next()).done) {
        let token = result.value;
        if (token instanceof Variable) {
            output.push(new Value(settings[token.name]));
        } else if (token instanceof Value) {
            output.push(token);
        } else if (token instanceof UnaryOperator) {
            stack.push(token);
        } else if (token instanceof BinaryOperator) {
            while (stack.length > 0 && !(stack[stack.length - 1] instanceof Parentheses)  && (stack[stack.length - 1] as Operator).precedence >= token.precedence) {
                output.push(stack.pop()!);
            }
            stack.push(token)
        } else if (token instanceof LeftParentheses) {
            stack.push(token);
        } else if (token instanceof RightParentheses) {
            while (!(stack[stack.length - 1] instanceof LeftParentheses)) {
                output.push(stack.pop()!);
            }
            stack.pop();
        }
    }

    while (stack.length > 0) {
        output.push(stack.pop()!);
    }

    const valueStack: Value[] = [];
    for (let token of output) {
        if (token instanceof Value) {
            valueStack.push(token)
        } else {
            valueStack.push((token as Operator).evaluate(valueStack));
        }
    }
    return valueStack[0].value;
}