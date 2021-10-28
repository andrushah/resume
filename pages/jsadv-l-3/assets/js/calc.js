class Calculatior {
    constructor(currentOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.currentOperand = '';
        this.operationArr = ['+', '-', '*', '/']; // список математичних операторів
        this.valid = true; // Визначення валідності для математичних операторів
        this.calculateString = ''; // Стрічка вираз
        this.brecketsCount = 0; // Початкове значення виразів у дужках
        this.equals = false;
    }
    /** Метод очищення змінних і дисплея калькулятора */
    clear() {
        this.currentOperand = '';
        this.operation = '';
        this.calculateString = '';
        this.brecketsCount = 0;
        currentOperandTextElement.classList.remove('animate__headShake');
        this.equals = false;
    }
    animateScreen() {
        let isAnimated = true;
        currentOperandTextElement.classList.add('animate__headShake');
        if (isAnimated) {
            setTimeout(() => {
                currentOperandTextElement.classList.remove('animate__headShake');
                isAnimated = false;
            }, 1000)
        }
    }
    /** Метод стирання останнього символа значення стрічки і поточного значення */
    delete() {
        if (this.equals) return;
        if (this.calculateString.slice(-1).includes('(')) {
            this.brecketsCount--;
        } else if (this.calculateString.slice(-1).includes(')')) {
            this.brecketsCount++;
        }
        this.deleteCurrentOperand();
        this.calculateString.slice(-1).includes('(');
        this.calculateString = this.calculateString.slice(0, -1);

    }
    deleteCurrentOperand() {
        if (this.currentOperand === '' && this.calculateString !== '') {
            for (let i = this.calculateString.length - 1; i > 0; i--) {
                if (isNaN(parseFloat(this.calculateString[i])) && this.calculateString[i] !== '.') {
                    let end = i;
                    let start = 0;
                    let newStr = this.calculateString.substring(0, end - 1);
                    if (newStr !== undefined) {
                        for (let i = newStr.length; i > 0; i--) {
                            if (isNaN(parseFloat(this.calculateString[i])) && this.calculateString[i] !== '.') {
                                start = i + 1;
                                break;
                            }
                        }
                    }
                    this.currentOperand = this.calculateString.substring(start, end);
                    this.valid = true;
                    if (start !== 0) break
                }
            }
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1); // видалення останнього елемента
        }
    }
    // Додавання чисел до стрічки
    appendNumber(number) {
        if (this.equals) return // якщо було проведено обрахунок повернення
        if (this.calculateString.slice(-1).includes('.') && isNaN(parseFloat(number))) {
            this.animateScreen();
            return;
        }
        if (number === '.' && this.calculateString.slice(-1).includes(')')) {
            this.animateScreen();
            return;
        }
        if (number === '.' && this.currentOperand.includes('.')) {
            this.animateScreen();
            return;
        } // перевірка на дублювання крапки в поточному числі
        /** запис 0 перед крапкою якщо 0 не введено */
        if (number === '.' && this.currentOperand === '' || number === '.' && this.calculateString.substr(-1) === "(") {
            number = '0.'
        }
        //якщо введено 0 тоді додаємо крапку
        if (number == '0' && this.currentOperand == '') {
            number = '0.';
        }
        /** Валідація коректного введення мат операторів і відкритих дужок */
        /** Валідація закриваючих дужок */
        // 1. Визначення кількості дужок (лічильник відкритих дужок)
        if (number === '(') {
            this.currentOperand = '';
            if (this.calculateString == '' || isNaN(parseFloat(this.calculateString.slice(-1))) && !this.calculateString.slice(-1).includes('(') && !this.calculateString.slice(-1).includes(')') || this.calculateString.slice(-1).includes('-') || this.calculateString.slice(-1).includes('(')) {
                this.currentOperand = number;

            } else if (this.calculateString.slice(-1).includes(')') || !isNaN(parseFloat(this.calculateString.slice(-1)))) {
                this.currentOperand = '*(';
            }
            // записуєм кількість відкритих дужок
            this.brecketsCount++
        }

        if (number === ')' && this.brecketsCount > 0) {
            this.currentOperand = '';
            if (this.calculateString.slice(-1).includes(')') || !isNaN(this.calculateString.slice(-1))) {
                this.currentOperand = number
                this.brecketsCount--;
            }
        } else if (this.brecketsCount <= 0 && number === ')') {
            this.currentOperand = '';
        }

        if (!isNaN(parseFloat(number)) || number.includes('.')) {
            if (!isNaN(parseFloat(number)) && this.calculateString.slice(-1).includes(')')) {
                this.currentOperand = '*' + number;
                this.calculateString += this.currentOperand;
            } else {
                this.currentOperand += number;
                this.calculateString += number;
            }
            this.valid = true;

        } else {
            this.calculateString += this.currentOperand;
            this.valid = true;
        }
        currentOperandTextElement.classList.remove('animate__headShake');
    }
    chooseOperation(operation) {
        if (this.equals) return // якщо було проведено обрахунок повернення
        // видалення крапки в кінці числа
        if (this.calculateString.substr(-1).includes('.')) {
            this.calculateString = this.calculateString.toString().slice(0, -1);
        }
        // перевірка на дублювання операторів
        this.currentOperand = '';
        this.operationArr.forEach((element) => {
            // Заборона на введення операторів поки немає числового значення
            if (this.calculateString.substr(-1).includes(element) || this.calculateString.substr(-1).includes('(')) {
                this.valid = false;
            }
            // Якщо перше число з мінусом
            if (this.calculateString === '' && operation === '-' || this.calculateString.substr(-1) === '(' && operation === '-') {
                this.calculateString += '-';
            }
        });

        if (this.calculateString === '' || !this.valid) {

            return
        }
        if (this.calculateString !== '') {
            this.calculateString += operation;
        }
        currentOperandTextElement.classList.remove('animate__headShake');
    }

    compute() {
        if (this.equals) return // якщо було проведено обрахунок повернення
        if (this.brecketsCount !== 0) {
            this.animateScreen();
            return
        }
        let str = this.calculateString.toString();
        console.log('Eval = ', eval(str));
        let end = str.indexOf(')') + 1;
        let newStr = str.substring(0, end);
        let start = newStr.lastIndexOf('(');
        let removeExp = newStr.substring(start, end);
        let expresson = newStr.substring(start + 1, end - 1);
        // Розвязок виразів у дужках + пуш їх в стрічку без виразів у дужках
        for (let i = 0; i < str.length; i++) {
            if (str.includes('(')) {
                end = str.indexOf(')') + 1; // знаходимо першу відкриту дужку
                newStr = str.substring(0, end); // вирізаємо кусок стрічки в нову змінну
                start = newStr.lastIndexOf('('); // знаходимо відкриту дужку яка відповідає першій закритій
                removeExp = newStr.substring(start, end); // створення стрічки для видалення виразу в дужках
                expresson = newStr.substring(start + 1, end - 1); // створення стрічки з виразу в дужках
                let newExp = this.calculate(expresson); // перетворення виразу в дужках в число(обрахунок виразу)
                if (newExp == undefined) {
                    str = str.replace(removeExp, ''); // при помилці в обрахунку якщо вираз некоректний видаляємо його з стрічки
                } else {
                    str = str.replace(removeExp, newExp); // записуємо числове значення виразу в зтрічку
                }
            }
        }

        if (!isNaN(parseFloat(this.calculate(str)))) {
            this.calculateString = ' = ' + this.calculate(str);
            this.equals = true;
            console.log('Result = ', this.calculate(str));

        } else {
            this.equals = false;
            this.animateScreen();
            console.log('Result = ', this.calculate(str));
            console.log('Incorrect expression');
            return
        }
    }


    // Розвязок стрічки БЕЗ виразів у дужках
    calculate(st) {
        let number = '';
        let numberArr = [];
        if (st !== undefined) {
            //заповнення масива числами і операторами
            for (let i = 0; i <= st.length; i++) {
                //перевірка чи перше число не з мінусом 
                if (st[0] === '-' && i === 0) {
                    number += st[0]; // якщо так додаємо його до першого числа
                    i++; //перехід до наступного елемента
                }
                // Перевірка першого елемента стрічки на числове значення
                if (st[0] !== '-' && isNaN(st[0])) {
                    i++;
                }
                // якщо наступний елемент стрічки число записуємо його в змінну
                if (!isNaN(parseFloat(st[i])) || st[i] === '.') {
                    number += st[i];
                    //якщо ні тоді пушимо число а потім нечисло в масив
                } else {
                    // якщо число порожне не пушимо
                    if (number !== '') {
                        numberArr.push(parseFloat(number));
                        number = '';
                    }
                    // якщо є оператор пушимо його в масив
                    if (st[i] !== undefined) {
                        // перевірка закону мінусів 
                        if (st[i] === '-' && st[i - 1] === '-') {
                            numberArr.pop();
                            numberArr.push('+');
                            // перевірка закону мінусів 
                        } else if (st[i] === '-' && st[i - 1] === '+') {
                            numberArr.pop();
                            numberArr.push('-');
                        } else {
                            numberArr.push(st[i]);
                        }
                    }
                }
            }
            // console.log('arr= ', numberArr);
            //кінець заповнення масива числами і операторами
            /** Перевірка на дублювання мінуса при переході зі стрічки до масиву */
            for (let i = 0; i < numberArr.length; i++) {
                if (!isNaN(parseFloat(numberArr[i])) && numberArr[i - 2] === '*' || !isNaN(parseFloat(numberArr[i])) && numberArr[i - 2] === '/') {
                    numberArr.splice((i - 1), 2, parseFloat(numberArr[i - 1] + numberArr[i]))
                }
            }
            if (numberArr[0] === '+') {
                numberArr.splice(0, 1);
            }
            // console.log(console.log('arr= ', numberArr));
            // опрацювання масиву з даними
            if (!isNaN(numberArr[numberArr.length - 1]) || numberArr[numberArr.length - 1] !== undefined) {
                //множення і ділення
                for (let i = 0; i < numberArr.length; i++) {
                    let res = 0;
                    if (numberArr.includes('*') || numberArr.includes('/')) {
                        switch (numberArr[i]) {
                            case '*':
                                res = numberArr[i - 1] * numberArr[i + 1];
                                numberArr.splice(i - 1, 3, res);
                                i = 0;
                                break
                            case '/':
                                res = numberArr[i - 1] / numberArr[i + 1];
                                numberArr.splice(i - 1, 3, res);
                                i = 0;
                                break
                        }
                    }
                }
                //додавання і віднімання
                for (let i = 0; i < numberArr.length; i++) {
                    let res = 0;
                    if (numberArr.includes('+') || numberArr.includes('-')) {
                        switch (numberArr[i]) {
                            case '+':
                                res = numberArr[i - 1] + numberArr[i + 1];
                                numberArr.splice(i - 1, 3, res);
                                i = 0;
                                break
                            case '-':
                                res = numberArr[i - 1] - numberArr[i + 1];
                                numberArr.splice(i - 1, 3, res);
                                i = 0;
                                break
                        }
                    }
                }
                return numberArr[0]; // повернення обчисленого значення
            } else {
                console.log('Err');
                return;
            }
        } else {
            console.log('Err');
            return;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.calculateString;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const opeartionButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const calculator = new Calculatior(currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

opeartionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
