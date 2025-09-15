export const extractPincode = (backText: string): string | null => {
  const pinMatches = backText.match(/\d{6}/g);
  return pinMatches?.[pinMatches.length - 1] || null;
}