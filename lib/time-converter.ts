import moment from "moment";

export const timeAgo = (date: string) => {
  const now = new Date();
  const nowMoment = moment(now);
  const pastMoment = moment(date);
  const timeAgoString = pastMoment.from(nowMoment); // 2 hours ago
  return timeAgoString;
};
