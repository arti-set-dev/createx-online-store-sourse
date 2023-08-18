export const parseImageSrc = (str) => {
  const dotPosition = str.lastIndexOf('.');
  return str.substring(0, dotPosition);
}
