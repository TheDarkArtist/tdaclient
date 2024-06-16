export const extractFirstParagraph = (content: string): string | null => {
  const lines = content.split("\n");
  console.log(lines);
  let paragraph = "";
  let foundFirstHeading = false;

  for (let line of lines) {
    // Trim leading and trailing spaces from the line
    line = line.trim();

    // Check for headings (consider ATX headings which can have leading spaces)
    if (!foundFirstHeading && line.startsWith("#")) {
      foundFirstHeading = true;
      continue;
    }

    // Collect lines for the paragraph after the first heading
    if (foundFirstHeading && !line.startsWith("#")) {
      if (line !== "") {
        paragraph += line + " ";
      } else if (paragraph !== "") {
        // Stop at the first empty line after starting to collect paragraph
        break;
      }
    }
  }

  // Trim the collected paragraph and return null if it's empty
  paragraph = paragraph.trim();
  return paragraph !== "" ? paragraph : null;
};
