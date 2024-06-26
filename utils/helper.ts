import CryptoJS from "crypto-js";
export const encryptText = (text: string): string => {
  const encJson = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    `${process.env.SECRET_KEY}`
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );
  return encData;
};

export const decryptText = (text: string): string => {
  const decData = CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(
    decData,
    `${process.env.SECRET_KEY}`
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
