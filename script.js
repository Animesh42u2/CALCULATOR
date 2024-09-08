document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    
    function updateDisplay(value) {
        display.textContent = value.length > 0 ? value : '0';
    }

    function handleNumber(value) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    function handleOperator(value) {
        if (currentInput === '' && value === '-') {
            currentInput = value;
        } else if (currentInput !== '' && operator) {
            currentInput = String(eval(`${firstOperand} ${operator} ${currentInput}`));
            firstOperand = currentInput;
            operator = value;
            updateDisplay(currentInput);
        } else {
            firstOperand = currentInput;
            operator = value;
            currentInput = '';
        }
    }

    function handleEqual() {
        if (firstOperand && operator) {
            currentInput = String(eval(`${firstOperand} ${operator} ${currentInput}`));
            updateDisplay(currentInput);
            firstOperand = '';
            operator = '';
        }
    }

    function handleClear() {
        currentInput = '';
        operator = '';
        firstOperand = '';
        updateDisplay('0');
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput.length > 0 ? currentInput : '0');
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.dataset.value;

            if (value === 'C') {
                handleClear();
            } else if (value === 'Backspace') {
                handleBackspace();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperator(value);
            } else if (value === '=') {
                handleEqual();
            } else {
                handleNumber(value);
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            handleNumber(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            handleOperator(e.key);
        } else if (e.key === 'Enter') {
            handleEqual();
        } else if (e.key === 'Escape') {
            handleClear();
        } else if (e.key === 'Backspace') {
            handleBackspace();
        }
    });
});
