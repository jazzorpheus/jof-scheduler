export function groupByDay(
  timeslots,
  { locale = "en-GB", timeZone = "UTC" } = {},
) {
  const dayKeyFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const weekdayFmt = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone,
  });

  const dayMonthFmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone,
  });

  const days = timeslots.reduce((acc, slot) => {
    const d = new Date(slot.datetimeUtc);
    const localDayKey = dayKeyFmt.format(d);

    (acc[localDayKey] ||= []).push(slot);
    return acc;
  }, {});

  return Object.entries(days)
    .map(([date, ts]) => {
      const d = new Date(ts[0].datetimeUtc);

      return {
        date,
        timeslots: ts,
        dayOfWeek: weekdayFmt.format(d),
        dayOfMonth: dayMonthFmt.format(d),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
