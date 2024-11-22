"use client";
import styled from "@emotion/styled";
import Day from "../Day/Day.tsx";
import { getMonthByWeek } from "../../utils/getMonthByWeek.ts";

interface CalendarProps {}

const Calendar = ({}: CalendarProps) => {
  const days = getMonthByWeek(2024, 11);

  return (
    <StyledCalendar>
      {days.map((day) => (
        <Day day={day} />
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
