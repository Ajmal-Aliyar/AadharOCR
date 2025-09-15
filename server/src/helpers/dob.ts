export const extractDOB = (frontText: string): string | null => {
  const dobMatch = frontText.match(
    /DOB\s*[:\-]?\s*(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/i
  );
  return dobMatch?.[1] || null;
}
