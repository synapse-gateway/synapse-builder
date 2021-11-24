export const REFRESH_RATE_IN_MINUTES = 5;

export const IN_SECONDS = {
  hour: 60 * 60,
  day: 60 * 60 * 24,
  week: 60 * 60 * 24 * 7,
  month: 60 * 60 * 24 * 30,
};

export const FORMATS = {
  hour: {
    timeFormat: "HH:mm",
    timeConversion: "MMM DD YYYY HH:mm",
  },
  day: {
    timeFormat: "HH:00",
    timeConversion: "MMM DD YYYY HH:00",
  },
  week: {
    timeFormat: "MMM D",
    timeConversion: "MMM DD YYYY",
  },
  month: {
    timeFormat: "MMM D",
    timeConversion: "MMM DD YYYY",
  },
};
