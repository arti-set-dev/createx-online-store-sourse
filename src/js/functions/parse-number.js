export const parseNumber = (str) => {
  if (typeof str !== 'number') {
    const cleanedStr = str?.replace(/[^0-9.]/g, '');
    const number = parseFloat(cleanedStr);

    return number;
  }
}
