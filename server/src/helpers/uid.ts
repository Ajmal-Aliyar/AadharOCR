export const extractUID = (text: string): string | null  => {
  const digits = text.match(/\d+/g);
  return digits ? digits.join("").slice(-12) : null;
}