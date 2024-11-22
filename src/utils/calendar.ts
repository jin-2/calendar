import { format } from "date-fns";
import { CalendarItemData, RecruitData } from "../types/recruit.ts";

export function getCalendarData(
  recruitData: RecruitData[]
): Map<string, CalendarItemData[]> {
  const map = new Map();
  recruitData.forEach(
    ({ start_time, end_time, id, company_name, duty_ids }) => {
      const startDate = getDateFromStringTime(new Date(start_time));
      const endDate = getDateFromStringTime(new Date(end_time));
      const baseItem = {
        id,
        company_name,
        duty_ids,
      };

      const existingStartDateItem = map.get(startDate) || [];
      map.set(startDate, [
        ...existingStartDateItem,
        { type: "start", ...baseItem },
      ]);

      const existingEndDateItem = map.get(endDate) || [];
      map.set(endDate, [...existingEndDateItem, { type: "end", ...baseItem }]);
    }
  );
  return map;
}

/*
 * @return "2024-05-31"
 * */
export function getDateFromStringTime(date: Date) {
  return format(date, "yyyy-MM-dd");
}
