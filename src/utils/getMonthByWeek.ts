import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";

export function getMonthByWeek(year: number, month: number) {
  const SUNDAY = 0;

  // month - 1 = 0: 1월, 1: 2월
  const startOfMonthDate = startOfMonth(new Date(year, month - 1));
  const endOfMonthDate = endOfMonth(startOfMonthDate);

  const weekStart = startOfWeek(startOfMonthDate, { weekStartsOn: SUNDAY });
  const weekEnd = endOfWeek(endOfMonthDate, { weekStartsOn: SUNDAY });

  const dates = eachDayOfInterval({ start: weekStart, end: weekEnd });
  return dates.map((date) => format(date, "yyyy-MM-dd")); // 원하는 포맷에 맞게 변환
}
