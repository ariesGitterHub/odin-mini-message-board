function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const options = {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  const formatted = date.toLocaleString("en-US", options);
  return formatted.replace(",", " at");
}

module.exports = { formatDate };
