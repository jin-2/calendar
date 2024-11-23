import { format } from "date-fns";
import {
  CalendarItemData,
  CalendarMapData,
  RecruitData,
} from "../types/recruit.ts";

export function getCalendarData(recruitData: RecruitData[]): CalendarMapData {
  const map = new Map();
  recruitData.forEach(
    ({ start_time, end_time, id, company_name, title, duty_ids }) => {
      const startDate = getDateFromStringTime(new Date(start_time));
      const endDate = getDateFromStringTime(new Date(end_time));
      const baseItem = {
        id,
        company_name,
        title,
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

  return sortedCalendarData(map);
}

function sortedCalendarData(map: CalendarMapData): CalendarMapData {
  const copyMap = new Map(map);
  const sortedEntries: [string, CalendarItemData[]][] = Array.from(copyMap).map(
    ([date, items]) => [
      date,
      items.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "start" ? -1 : 1;
        }

        return a.company_name.localeCompare(b.company_name, "en");
      }),
    ]
  );

  return new Map(sortedEntries);
}

/*
 * @return "2024-05-31"
 * */
export function getDateFromStringTime(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function getViewDayData(
  list: CalendarItemData[]
): Map<string, CalendarItemData[]> {
  return list.reduce((map, item) => {
    const keyName = item.company_name + "_" + item.type;
    const existing = map.get(keyName) ?? [];
    map.set(keyName, [...existing, item]);
    return map;
  }, new Map());
}
