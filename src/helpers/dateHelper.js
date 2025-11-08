function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", // Ensures use of EDT/EST
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  const formattedDate = formatter.format(date).replace(",", " - ");

  return formattedDate;
}

module.exports = formatDate;
