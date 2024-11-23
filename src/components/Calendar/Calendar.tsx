"use client";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getRecruits } from "../../api/calendar.ts";
import { RecruitData } from "../../types/recruit.ts";
import { getMonthByWeek } from "../../utils/getMonthByWeek.ts";
import { getArrayToMap } from "../../utils/getArrayToMap.ts";
import { getCalendarData } from "../../utils/calendar.ts";
import Day from "../Day/Day.tsx";

interface CalendarProps {}

const Calendar = ({}: CalendarProps) => {
  const { data } = useQuery({
    queryKey: ["RECRUITS"],
    queryFn: getRecruits,
  });

  const days = getMonthByWeek(2024, 11);

  const recruitDataToMap = useMemo(() => {
    return getArrayToMap<RecruitData>(data ?? [], "id");
  }, [data]);

  const recruitDataByCalendar = useMemo(() => {
    return getCalendarData(data ?? []);
  }, [data]);

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
