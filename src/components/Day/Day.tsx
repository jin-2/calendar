"use client";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { CalendarItemData } from "../../types/recruit.ts";
import { getViewDayData } from "../../utils/calendar.ts";

interface DayProps {
  day: string; // yyyy-MM-dd
  data: CalendarItemData[];
}

const Day = ({ day, data }: DayProps) => {
  const viewData = useMemo(() => {
    const map = getViewDayData(data);
    return Array.from(map.values());
  }, [data]);

  return (
    <StyledDay>
      <time dateTime={day}>{day}</time>
      {viewData &&
        viewData.map((group) => {
          const [first, second] = group;
          return (
            <li key={first.company_name + "_" + first.type}>
              <p>{first.company_name}</p>
              {second ? (
                <ul>
                  {group.map((item) => (
                    <li key={item.id}>{item.title}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
    </StyledDay>
  );
};

export default Day;

const StyledDay = styled.div``;
