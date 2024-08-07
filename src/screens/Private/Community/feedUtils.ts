export const hashtagDetector = (text: string): string[] => {
  // Regular expression to match hashtags
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;

  // Extract all hashtags from the text
  const hashtags = text.match(hashtagRegex) || [];

  return hashtags;
};
