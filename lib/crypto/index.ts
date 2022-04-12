import crypto from 'crypto';

function getMD5(): Buffer {
  return crypto.createHash('md5').update(process.env.SECRET_KEY!!).digest();
}

function encrypt3DES(text:  string | undefined | null): string | undefined {
  if(text === undefined || text === null) return undefined;
  /* 
    use 3DES(https://en.wikipedia.org/wiki/Triple_DES) algorithm to encrypt
    'text' using 'secretKey'
    */
  // create hash of scret key
  var secretKeyHash = getMD5();
  // properly expand 3DES key from 128 bit to 192 bit
  secretKeyHash = Buffer.concat([secretKeyHash, secretKeyHash.slice(0, 8)]);
  // create the cipher initial vector for 3DES with secretKeyHash
  const cipher = crypto.createCipheriv('des-ede3', secretKeyHash, '');
  // Update the cipher with text
  // refer: https://nodejs.org/api/crypto.html#crypto_cipher_update_data_inputencoding_outputencoding
  const encrypted = cipher.update(text, 'utf8', 'base64');
  // Once the cipher.final() method has been called, the Cipher object can no longer be used to encrypt data.
  // refer: https://nodejs.org/api/crypto.html#crypto_cipher_final_outputencoding
  return encrypted + cipher.final('base64');
}

function decrypt3DES(encryptedBase64: string | undefined | null): string | undefined {
  if(encryptedBase64 === undefined || encryptedBase64 === null) return undefined;
  /* 
    use 3DES(https://en.wikipedia.org/wiki/Triple_DES) algorithm to decrypt
    'encryptedBase64' using 'secretKey'
    */
  var secretKeyHash = getMD5();
  secretKeyHash = Buffer.concat([secretKeyHash, secretKeyHash.slice(0, 8)]);
  const decipher = crypto.createDecipheriv('des-ede3', secretKeyHash, '');
  let decrypted = decipher.update(encryptedBase64, 'base64', 'utf8');
  decrypted += decipher.final();
  return decrypted.toString();
}

export default {
  encrypt3DES,
  decrypt3DES,
};
