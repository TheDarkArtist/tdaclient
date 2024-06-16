export const extractFirstHeading = (
  content: string,
): { text: string; id: string } | null => {
  const lines = content.split("\n");
  for (let line of lines) {
    if (line.startsWith("#")) {
      const headingText = line.replace(/^#+\s*/, "");
      const id = headingText.toLowerCase().replace(/\s+/g, "-");
      return { text: headingText, id };
    }
  }
  return null; // Return null if no heading is found
};
