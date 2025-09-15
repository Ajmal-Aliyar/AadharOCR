export const calculateAgeBand = (dob: string | null): string | null => {
  if (!dob) return null;
  const birthYearMatch = dob.match(/\d{4}/);
  if (!birthYearMatch) return null;

  const birthYear = parseInt(birthYearMatch[0], 10);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 20) return "<20";
  if (age < 30) return "20-30";
  if (age < 40) return "30-40";
  if (age < 50) return "40-50";
  return "50+";
}