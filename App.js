// var prompt = require('prompt')
// prompt.start()
// var x=prompt.get("enter your name:")
// console.log(x)


/*
    creater dhinesh moorthy and preethika
    consept : hybrid algoritm to encript and decript the data using of ml hackcking dedection modal
*/


// const crypto = require('crypto');

// // AES encryption and decryption functions
// function aesEncrypt(key, data) {
//   const cipher = crypto.createCipheriv('aes-256-cbc', key, '');
//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// function aesDecrypt(key, encryptedData) {
//   const decipher = crypto.createDecipheriv('aes-256-cbc', key, '');
//   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Twofish encryption and decryption functions
// function twofishEncrypt(key, data) {
//   const cipher = crypto.createCipheriv('twofish', key, '');
//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// function twofishDecrypt(key, encryptedData) {
//   const decipher = crypto.createDecipheriv('twofish', key, '');
//   let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Hybrid encryption function
// function hybridEncrypt(aesKey, twofishKey, data) {
//   const encryptedAes = aesEncrypt(aesKey, data);
//   const encryptedTwofish = twofishEncrypt(twofishKey, encryptedAes);
//   return encryptedTwofish;
// }

// // Hybrid decryption function
// function hybridDecrypt(aesKey, twofishKey, encryptedData) {
//   const decryptedTwofish = twofishDecrypt(twofishKey, encryptedData);
//   const decryptedAes = aesDecrypt(aesKey, decryptedTwofish);
//   return decryptedAes;
// }

// // Example usage
// const plaintext = 'This is the plaintext message';

// // Generate AES and Twofish keys
// const aesKey = crypto.randomBytes(32);  // 256-bit AES key
// const twofishKey = crypto.randomBytes(32);  // 256-bit Twofish key

// // Encryption
// const encryptedData = hybridEncrypt(aesKey, twofishKey, plaintext);
// console.log('Encrypted Data:', encryptedData);

// // Decryption
// const decryptedData = hybridDecrypt(aesKey, twofishKey, encryptedData);
// console.log('Decrypted Data:', decryptedData);


const crypto = require('crypto');

// AES encryption and decryption functions
function aesEncrypt(key, data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv };
}

function aesDecrypt(key, encryptedData, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Twofish encryption and decryption functions
function twofishEncrypt(key, data) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('twofish', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv };
}

function twofishDecrypt(key, encryptedData, iv) {
  const decipher = crypto.createDecipheriv('twofish', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Hybrid encryption function
function hybridEncrypt(aesKey, twofishKey, data) {
  const aesResult = aesEncrypt(aesKey, data);
  const encryptedAes = aesResult.encrypted;
  const aesIv = aesResult.iv;

  const twofishResult = twofishEncrypt(twofishKey, encryptedAes);
  const encryptedTwofish = twofishResult.encrypted;
  const twofishIv = twofishResult.iv;

  return { encryptedTwofish, aesIv, twofishIv };
}

// Hybrid decryption function
function hybridDecrypt(aesKey, twofishKey, encryptedTwofish, aesIv, twofishIv) {
  const decryptedTwofish = twofishDecrypt(twofishKey, encryptedTwofish, twofishIv);
  const decryptedAes = aesDecrypt(aesKey, decryptedTwofish, aesIv);
  return decryptedAes;
}

// Example usage
const plaintext = 'This is the plaintext message';

// Generate AES and Twofish keys
const aesKey = crypto.randomBytes(32);  // 256-bit AES key
const twofishKey = crypto.randomBytes(32);  // 256-bit Twofish key

// Encryption
const { encryptedTwofish, aesIv, twofishIv } = hybridEncrypt(aesKey, twofishKey, plaintext);
console.log('Encrypted Data:', encryptedTwofish);
console.log('AES IV:', aesIv.toString('hex'));
console.log('Twofish IV:', twofishIv.toString('hex'));

// Decryption
const decryptedData = hybridDecrypt(aesKey, twofishKey, encryptedTwofish, aesIv, twofishIv);
console.log('Decrypted Data:', decryptedData);
