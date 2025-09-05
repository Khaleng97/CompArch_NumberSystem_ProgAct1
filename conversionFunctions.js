function convertToAnyBase(decimal, base) {
    if (decimal === 0) return '0';
    let [intPart, fracPart] = String(decimal).split('.');
    let result = '';

    // Convert integer part
    let intValue = parseInt(intPart, 10);
    if (intValue < 0) intValue = -intValue;
    while (intValue > 0) {
        let remainder = intValue % base;
        result = String(remainder) + result;
        intValue = Math.floor(intValue / base);
    }
    if (result === '') result = '0';

    // Convert fractional part
    if (fracPart) {
        let fracValue = parseFloat('0.' + fracPart);
        result += '.';
        for (let i = 0; i < 16 && fracValue > 0; i++) { // Limit precision
            fracValue *= base;
            let digit = Math.floor(fracValue);
            if (base === 16 && digit >= 10) {
                result += String.fromCharCode(55 + digit);
            } else {
                result += String(digit);
            }
            fracValue -= digit;
        }
    }
    return result;
}

function convertBaseToDecimal(num, base) {
    let parts = String(num).split('.');
    let integerPart = parts[0];
    let fractionalPart = parts[1] || '';

    let decimal = 0;
    // Convert integer part
    for (let i = 0; i < integerPart.length; i++) {
        let digit = parseInt(integerPart[i], base);
        if (isNaN(digit)) return NaN;
        decimal += digit * Math.pow(base, integerPart.length - 1 - i);
    }

    // Convert fractional part
    for (let i = 0; i < fractionalPart.length; i++) {
        let digit = parseInt(fractionalPart[i], base);
        if (isNaN(digit)) return NaN;
        decimal += digit * Math.pow(base, -(i + 1));
    }
    return decimal;
}