export const uint8toHex = (num: number) => {
  const uint = num % 256;
  return uint.toString(16).padStart(2, '0');
};
