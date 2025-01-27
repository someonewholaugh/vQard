import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPT_SECRET_KEY;

if (!secretKey) {
  console.warn('Secret key is not defined. Encryption and decryption will be disabled.');
}

export const encryptValue = (value: string): string => {
  if (!secretKey) return value;
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

export const decryptValue = (encryptedValue: string): string | null => {
  if (!secretKey) return encryptedValue;
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedValue), secretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedValue) {
      throw new Error('Decryption failed. Empty result.');
    }

    return decryptedValue;
  } catch (error) {
    console.error('Failed to decrypt value:', error instanceof Error ? error.message : error);
    return null;
  }
};
