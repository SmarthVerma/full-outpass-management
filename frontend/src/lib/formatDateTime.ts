export default function formatDateTime(milliseconds: string): string {
  // Parse the string to a number
  const ms = parseInt(milliseconds, 10);

  // Check if the parsed value is a valid number
  if (isNaN(ms)) {
    throw new Error("Invalid input: milliseconds must be a numeric string");
  }

  // Create a Date object
  const date = new Date(ms);

  // Format the date (e.g., "YYYY-MM-DD HH:mm:ss")
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  });

  return formattedDate;
}
