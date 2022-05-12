export const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (Math.round(elapsed / 1000) <= 5) return "just now";
    else {
      return Math.round(elapsed / 1000) + " seconds ago";
    }
  } else if (elapsed < msPerHour) {
    if (Math.round(elapsed / msPerMinute) <= 1) return "about a minute ago";
    else {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    }
  } else if (elapsed < msPerDay) {
    if (Math.round(elapsed / msPerHour) <= 1) return "about an hour ago";
    else {
      return Math.round(elapsed / msPerHour) + " hours ago";
    }
  } else if (elapsed < msPerMonth) {
    if (Math.round(elapsed / msPerDay) <= 1) return "about a day ago";
    else {
      return "about " + Math.round(elapsed / msPerDay) + " days ago";
    }
  } else if (elapsed < msPerYear) {
    if (Math.round(elapsed / msPerMonth) <= 1) return "about a month ago ";
    else {
      return "about " + Math.round(elapsed / msPerMonth) + " months ago";
    }
  } else {
    if (Math.round(elapsed / msPerYear) <= 1) return "about a year ago";
    else {
      return "about " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }
};
