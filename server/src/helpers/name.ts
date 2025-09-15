export const extractName = (frontText: string): string | null => {
  const lines = frontText.split(/\n|\r/).map(line => line.trim()).filter(Boolean);
  const dobIndex = lines.findIndex(line => /DOB/i.test(line));
  return dobIndex > 0 ? lines[dobIndex - 1] : null;
}