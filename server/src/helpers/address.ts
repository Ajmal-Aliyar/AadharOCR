export const extractAddress = (backText: string): string | null => {
  const addressMatch = backText.match(
    /address[:\-]?\s*([\s\S]+?)(Uttar Pradesh|[A-Z]{2,} - \d{6}|$)/i
  );
  return addressMatch?.[1].replace(/\n/g, " ").trim() || null;
}