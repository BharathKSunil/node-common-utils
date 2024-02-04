"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
function getMD5() {
    return crypto_1.default.createHash('md5').update(process.env.SECRET_KEY).digest();
}
function encrypt3DES(text) {
    if (text === undefined || text === null)
        return undefined;
    /*
      use 3DES(https://en.wikipedia.org/wiki/Triple_DES) algorithm to encrypt
      'text' using 'secretKey'
      */
    // create hash of scret key
    var secretKeyHash = getMD5();
    // properly expand 3DES key from 128 bit to 192 bit
    secretKeyHash = Buffer.concat([secretKeyHash, secretKeyHash.subarray(0, 8)]);
    // create the cipher initial vector for 3DES with secretKeyHash
    var cipher = crypto_1.default.createCipheriv('des-ede3', secretKeyHash, '');
    // Update the cipher with text
    // refer: https://nodejs.org/api/crypto.html#crypto_cipher_update_data_inputencoding_outputencoding
    var encrypted = cipher.update(text, 'utf8', 'base64');
    // Once the cipher.final() method has been called, the Cipher object can no longer be used to encrypt data.
    // refer: https://nodejs.org/api/crypto.html#crypto_cipher_final_outputencoding
    return encrypted + cipher.final('base64');
}
function decrypt3DES(encryptedBase64) {
    if (encryptedBase64 === undefined || encryptedBase64 === null)
        return undefined;
    /*
      use 3DES(https://en.wikipedia.org/wiki/Triple_DES) algorithm to decrypt
      'encryptedBase64' using 'secretKey'
      */
    var secretKeyHash = getMD5();
    secretKeyHash = Buffer.concat([secretKeyHash, secretKeyHash.subarray(0, 8)]);
    var decipher = crypto_1.default.createDecipheriv('des-ede3', secretKeyHash, '');
    var decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
    decrypted += decipher.final().toString('utf8');
    return decrypted;
}
exports.default = {
    encrypt3DES: encrypt3DES,
    decrypt3DES: decrypt3DES,
};
