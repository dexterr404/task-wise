const MAX_MESSAGE_LENGTH = 200;

export function sanitizeMessage(message) {
  // Trim whitespace
  let sanitized = message.trim();

  // Limit length
  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    sanitized = sanitized.slice(0, MAX_MESSAGE_LENGTH);
  }

  return sanitized;
}
