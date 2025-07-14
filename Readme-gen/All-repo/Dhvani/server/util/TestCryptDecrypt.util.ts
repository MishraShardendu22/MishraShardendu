import { CryptMaker, DecryptMaker } from './CryptDecrypt.util';

const text = 'Hello, this is a secret message!';

const encrypted = CryptMaker(text).encrypt();
console.log('Encrypted:', encrypted);

const decrypted = DecryptMaker(encrypted.encryptedData).decrypt(encrypted.iv);
console.log('Decrypted:', decrypted);
