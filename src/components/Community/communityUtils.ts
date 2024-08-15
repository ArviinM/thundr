export const processDomain = (domain: string | null): string | null => {
  if (!domain) {
    return null;
  }
  if (domain.startsWith('www.')) {
    return domain.slice(4);
  }
  return domain;
};

export const calculateWidth = (
  totalAttachments: number,
  index: number,
): number => {
  if (totalAttachments === 1) {
    return 100;
  }
  if (totalAttachments === 2) {
    return 49.66;
  }
  if (totalAttachments === 3 && index === 0) {
    return 100;
  }
  if (totalAttachments === 3 && index > 0) {
    return 49.66;
  }
  if (totalAttachments === 4) {
    return 49.66;
  }
  return 100; // Default case
};
export const calculateAspectRatio = (
  totalAttachments: number,
  index: number,
  attachmentWidth: number,
  attachmentHeight: number,
) => {
  const aspectRatio = attachmentWidth / attachmentHeight;

  if (totalAttachments === 1) {
    if (Math.abs(aspectRatio - 1) < 0.01) {
      // Square
      return 1;
    } else if (aspectRatio > 1) {
      // Landscape
      return Math.min(aspectRatio, 16 / 9);
    } else {
      // Portrait
      return Math.max(aspectRatio, 3 / 4);
    }
  }

  if (totalAttachments === 2) {
    return 7 / 8; // Square aspect ratio for 2 images
  }

  if (totalAttachments === 3) {
    if (index === 0) {
      return 1.67; // First image is wide
    } else {
      return 1.67; // Other two are square
    }
  }

  if (totalAttachments === 4) {
    return 1.67; // All images are square in a 2x2 grid
  }

  return 1; // Default square aspect ratio
};
