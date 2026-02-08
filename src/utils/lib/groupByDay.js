// Group timeslots by day and add formatted strings
export function groupByDay(
  timeslots,
  { locale = "en-GB", timeZone = "UTC" } = {},
) {
  const days = timeslots.reduce((acc, slot) => {
    const day = slot.datetime.split("T")[0];
    (acc[day] ||= []).push(slot);
    return acc;
  }, {});

  const weekdayFmt = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone,
  });
  const dayMonthFmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone,
  });

  return Object.entries(days)
    .map(([date, ts]) => {
      const d = new Date(date + "T00:00:00"); // avoid time zone issues
      return {
        date,
        timeslots: ts,
        dayOfWeek: weekdayFmt.format(d),
        dayOfMonth: dayMonthFmt.format(d),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
