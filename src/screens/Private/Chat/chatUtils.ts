export function truncateChatPreview(
  message: string,
  maxLength: number = 26,
): string {
  // If the message is shorter than the limit, return it unchanged
  if (message.length <= maxLength) {
    return message;
  }

  // Truncate to the desired length
  const truncatedMessage = message.slice(0, maxLength - 3);

  // Add the ellipsis
  return `${truncatedMessage}...`;
}
