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

    let encodedMessages = JSON.parse(localStorage.getItem('encodedMessages') || '[]');
    encodedMessages.push({
        encodedDecimal: decimalList,
        encodingKey: key
    });
    localStorage.setItem('encodedMessages', JSON.stringify(encodedMessages));
}

// 5. Secret Code Translator (Decode)
function decodeMessage() {
    const key = parseInt(document.getElementById('secretKeyDecode').value);
    const resultBox = document.getElementById('result-decode');
    let encodedMessages = JSON.parse(localStorage.getItem('encodedMessages') || '[]');
    
    if (isNaN(key) || encodedMessages.length === 0) {
        resultBox.innerHTML = '<p class="error-message">Invalid input. Please enter a valid key and encode a message first.</p>';
        resultBox.style.display = 'block';
        return;
    }

    let decodedMessage = null;

    for (let i = 0; i < encodedMessages.length; i++) {
        if (key === encodedMessages[i].encodingKey) {
            const encodedDecimal = encodedMessages[i].encodedDecimal;
            decodedMessage = '';
            try {
                for (const val of encodedDecimal) {
                    decodedMessage += String.fromCharCode(val - key);
                }
                break;
            } catch (e) {
                resultBox.innerHTML = `<p class="error-message">Error decoding. Ensure values are a comma-separated list of numbers.</p>`;
                resultBox.style.display = 'block';
                return;
            }
        }
    }

    if (decodedMessage) {
        resultBox.innerHTML = `<p><strong>Decoded Message:</strong> ${decodedMessage}</p>`;
    } else {
        resultBox.innerHTML = '<p class="error-message">Incorrect secret key. No message to decode with this key.</p>';
    }
    
    resultBox.style.display = 'block';
}