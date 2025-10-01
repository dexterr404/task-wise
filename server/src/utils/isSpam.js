export function isSpam(message) {
  const cleaned = message.replace(/\s/g, ""); // remove spaces
  if (cleaned.length < 3) return true; // too short

  // Check for repeated sequences of the same character
  const repeatMatch = cleaned.match(/(.)\1{4,}/g);
  if (repeatMatch) return true;

  // Check for high overall repetition of any single character (>50%)
  const charCounts = {};
  for (const char of cleaned) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  const maxCount = Math.max(...Object.values(charCounts));
  if (maxCount / cleaned.length > 0.5) return true;

  return false;
}
