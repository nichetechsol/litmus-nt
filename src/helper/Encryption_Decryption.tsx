/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';

export const ENCRYPTION_KEY = 'pass123';
export const encryptData = (data: any): string => {
  if (!data && data !== 0) {
    return '';
  }
  const stringData = String(data); // Convert to string
  return CryptoJS.AES.encrypt(stringData, ENCRYPTION_KEY).toString();
};
export const decryptData = (encryptedData: string | null): any => {
  if (!encryptedData) {
    return null;
  }
  try {
    const decryptedString = CryptoJS.AES.decrypt(
      encryptedData,
      ENCRYPTION_KEY,
    ).toString(CryptoJS.enc.Utf8);
    return !isNaN(Number(decryptedString))
      ? Number(decryptedString)
      : decryptedString;
  } catch (error) {
    // console.error('Decryption error:', error);
    return null;
  }
};
