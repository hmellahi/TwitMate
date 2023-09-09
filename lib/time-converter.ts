import moment from "moment";

export const timeAgo = (date: string) => {
  const now = new Date();
  const pastMoment = moment(date);
  const duration = moment.duration(now - pastMoment);

  if (duration.asMinutes() < 1) {
    return `${Math.floor(duration.asSeconds())}s`;
  } else if (duration.asHours() < 1) {
    return `${Math.floor(duration.asMinutes())}m`;
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())}h`;
  } else {
    return `${Math.floor(duration.asDays())}d`;
  }
};
