export const extractGender = (frontText: string): string | null => {
  const genderMatch = frontText.match(/(Male|Female|Transgender)/i);
  return genderMatch?.[1] || null;
}