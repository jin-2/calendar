import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";

export function getMonthByWeek(date: Date) {
  const SUNDAY = 0;

  const startOfMonthDate = startOfMonth(date);
  const endOfMonthDate = endOfMonth(startOfMonthDate);

  const weekStart = startOfWeek(startOfMonthDate, { weekStartsOn: SUNDAY });
  const weekEnd = endOfWeek(endOfMonthDate, { weekStartsOn: SUNDAY });

  const dates = eachDayOfInterval({ start: weekStart, end: weekEnd });
  return dates.map((date) => format(date, "yyyy-MM-dd"));
}
