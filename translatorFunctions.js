// 4. Secret Code Translator (Encode)
function encodeMessage() {
    const message = document.getElementById('message').value;
    const key = parseInt(document.getElementById('secretKeyEncode').value);
    const resultBox = document.getElementById('result-encode');

    if (message === '' || isNaN(key)) {
        resultBox.innerHTML = '<p class="error-message">Invalid input. Please enter a message and a valid key.</p>';
        resultBox.style.display = 'block';
        return;
    }

    const decimalList = [];
    const hexList = [];

    for (const char of message) {
        const ascii = char.charCodeAt(0);
        const encoded = ascii + key;
        decimalList.push(encoded);
        hexList.push(encoded.toString(16).toUpperCase());
    }

    resultBox.innerHTML = `
        <p><strong>Encoded (Decimal):</strong> [${decimalList.join(', ')}]</p>
        <p><strong>Encoded (Hex):</strong> [${hexList.join(', ')}]</p>
    `;
    resultBox.style.display = 'block';
}

// 5. Secret Code Translator (Decode)
function decodeMessage() {
    const encodedStr = document.getElementById('encodedValues').value;
    const key = parseInt(document.getElementById('secretKeyDecode').value);
    const resultBox = document.getElementById('result-decode');

    if (encodedStr === '' || isNaN(key)) {
        resultBox.innerHTML = '<p class="error-message">Invalid input. Please enter values and a valid key.</p>';
        resultBox.style.display = 'block';
        return;
    }

    const values = encodedStr.split(',').map(val => parseInt(val.trim()));
    let decodedMessage = '';

    try {
        for (const val of values) {
            if (isNaN(val)) throw new Error('Invalid value in list.');
            decodedMessage += String.fromCharCode(val - key);
        }
        resultBox.innerHTML = `<p><strong>Decoded Message:</strong> ${decodedMessage}</p>`;
    } catch (e) {
        resultBox.innerHTML = `<p class="error-message">Error decoding. Ensure values are a comma-separated list of numbers.</p>`;
    }
    resultBox.style.display = 'block';
}