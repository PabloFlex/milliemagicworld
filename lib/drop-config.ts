const DROP_MONTH = 1; // February (0-indexed)
const DROP_DAY = 14;
const DROP_HOUR_PARIS = 19; // 20:00 CET == 19:00 UTC
const DROP_MINUTE = 0;
const DROP_TIMEZONE = "Europe/Paris";

const computeNextDropDate = () => {
  const now = new Date();

  const candidate = new Date(Date.UTC(now.getUTCFullYear(), DROP_MONTH, DROP_DAY, DROP_HOUR_PARIS, DROP_MINUTE, 0));

  if (now.getTime() >= candidate.getTime()) {
    candidate.setUTCFullYear(candidate.getUTCFullYear() + 1);
  }

  return candidate;
};

export const DROP_DATE = computeNextDropDate();

export const DROP_LABEL = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: DROP_TIMEZONE,
}).format(DROP_DATE);

export const hasDropOpened = () => Date.now() >= DROP_DATE.getTime();

const DROP_SKIP_STORAGE_KEY = "millie-drop-skip";

export const hasSkippedDrop = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(DROP_SKIP_STORAGE_KEY) === "1";
};

export const skipDrop = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DROP_SKIP_STORAGE_KEY, "1");
};
