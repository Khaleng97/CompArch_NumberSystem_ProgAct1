function convertToAnyBase(decimal, base) {
    if (decimal === 0) return '0';
    let [intPart, fracPart] = String(decimal).split('.');
    let result = '';
    let isNegative = false;

    let intValue = parseInt(intPart, 10);
    if (intValue < 0) {
        isNegative = true;
        intValue = -intValue;
    }

    while (intValue > 0) {
        let remainder = intValue % base;
        let digit = remainder;
        if (base === 16 && digit >= 10) {
            result = String.fromCharCode(65 + (digit - 10)) + result;
        } else {
            result = String(digit) + result;
        }
        intValue = Math.floor(intValue / base);
    }
    if (result === '') result = '0';

    if (isNegative) {
        result = '-' + result;
    }

    if (fracPart) {
        let fracValue = parseFloat('0.' + fracPart);
        if (isNegative) fracValue = -fracValue; 
        result += '.';
        for (let i = 0; i < 16 && Math.abs(fracValue) > 0; i++) {
            fracValue *= base;
            let digit = Math.floor(fracValue);
            if (base === 16 && digit >= 10) {
                result += String.fromCharCode(65 + (digit - 10));
            } else {
                result += String(digit);
            }
            fracValue -= digit;
        }
    }
    return result;
}

function convertBaseToDecimal(num, base) {
    let isNegative = false;
    if (num.startsWith('-')) {
        isNegative = true;
        num = num.slice(1);
    }

    let parts = String(num).split('.');
    let integerPart = parts[0];
    let fractionalPart = parts[1] || '';

    let decimal = 0;
    for (let i = 0; i < integerPart.length; i++) {
        let digit = parseInt(integerPart[i], base);
        if (isNaN(digit)) return NaN;
        decimal += digit * Math.pow(base, integerPart.length - 1 - i);
    }

    for (let i = 0; i < fractionalPart.length; i++) {
        let digit = parseInt(fractionalPart[i], base);
        if (isNaN(digit)) return NaN;
        decimal += digit * Math.pow(base, -(i + 1));
    }

    if (isNegative) {
        decimal = -decimal;
    }

    return decimal;
}