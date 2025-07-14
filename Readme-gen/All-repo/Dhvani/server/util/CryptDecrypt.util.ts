import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.CRYPT_KEY as string;
const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM as string;

const key = crypto
  .createHash('sha256')
  .update(ENCRYPTION_KEY)
  .digest('hex')
  .slice(0, 32);

const encrypt = (
  text: string,
  key: string
): { iv: string; encryptedData: string } => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(key, 'utf-8'),
    iv
  );
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

const decrypt = (encryptedData: string, key: string, iv: string): string => {
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(key, 'utf-8'),
    Buffer.from(iv, 'hex')
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

const CryptMaker = (input: string) => {
  return {
    encrypt: (): { iv: string; encryptedData: string } => encrypt(input, key),
  };
};

const DecryptMaker = (input: string) => {
  return {
    decrypt: (iv: string): string => decrypt(input, key, iv),
  };
};

export { CryptMaker, DecryptMaker };
