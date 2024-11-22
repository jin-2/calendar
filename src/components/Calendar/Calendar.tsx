"use client";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { RecruitData } from "../../types/recruit.ts";
import { getMonthByWeek } from "../../utils/getMonthByWeek.ts";
import { getArrayToMap } from "../../utils/getArrayToMap.ts";
import { getCalendarData } from "../../utils/calendar.ts";
import Day from "../Day/Day.tsx";

interface CalendarProps {
  recruitData: RecruitData[];
}

const Calendar = ({ recruitData }: CalendarProps) => {
  const days = getMonthByWeek(2024, 11);

  const recruitDataToMap = useMemo(() => {
    return getArrayToMap<RecruitData>(recruitData ?? [], "id");
  }, [recruitData]);

  const recruitDataByCalendar = useMemo(() => {
    return getCalendarData(recruitData ?? []);
  }, [recruitData]);

  return (
    <StyledCalendar>
      {days.map((day) => (
        <Day key={day} day={day} data={recruitDataByCalendar.get(day) ?? []} />
      ))}
    </StyledCalendar>
  );
};

export default Calendar;

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;
