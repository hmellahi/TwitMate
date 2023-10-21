import { formatDistanceToNow } from "date-fns";

export const timeAgo = (dateString: string): string => {
  const pastDate = new Date(dateString);

  const timeDifference = formatDistanceToNow(pastDate);

  // Remove "about" and "ago" parts from the time difference
  const timeDifferenceWithoutAboutAndAgo = timeDifference.replace("about ", "").replace(" ago", "");

  return timeDifferenceWithoutAboutAndAgo;
};

export function unixTimestampToDateTime(unixTimestamp: number): Date {
  const milliseconds = unixTimestamp * 1000; // Convert to milliseconds
  return new Date(milliseconds);
}
