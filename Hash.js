const crypto = require('crypto');
const key = Buffer.from('1234567890123456'); // 16 bytes key
const iv = Buffer.alloc(0); // empty initialization vector for ECB mode

// Encrypt function
function encrypt(data) {
    const cipher = Crypto.createCipheriv('aes-128-ecb', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

// Decrypt function
function decrypt(data) {
    const decipher = Crypto.createDecipheriv('aes-128-ecb', key, iv);
    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Test
let data = "Hello World";
let encryptedData = encrypt(data);
console.log("Encrypted Data: " + encryptedData);
let decryptedData = decrypt(encryptedData);
console.log("Decrypted Data: " + decryptedData);

// Node.js Code
const Crypto = require("crypto");
const secret_key = process.env.SECRET_KEY; // get secret key from environment variable
const secret_iv = process.env.SECRET_IV; // get secret initialization vector from environment variable

// Encrypt function
function encrypt(data) {
    const cipher_key = crypto.createHash("sha256").update(secret_key).digest(); // create a hash of the secret key
    const cipher_iv = Buffer.from(secret_iv); // create a buffer of the secret initialization vector
    const cipher = crypto.createCipheriv(process.env.ECNRYPTION_METHOD, cipher_key, cipher_iv); // create a cipher object with the encryption method, key and iv
    let encrypted_data = cipher.update(data); // update the cipher with the data to be encrypted 
    encrypted_data += cipher.final(); // finalize the encryption process 
    return Buffer.from(encrypted_data).toString("base64"); // return the encrypted data as a base64 string 
}

// Decrypt function 
function decrypt(data) {
    const decipher_key = crypto.createHash("sha256").update(secret_key).digest();

}
