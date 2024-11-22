"use client";
import styled from "@emotion/styled";
import { CalendarItemData } from "../../types/recruit.ts";

interface DayProps {
  day: string; // yyyy-MM-dd
  data: CalendarItemData[];
}

const Day = ({ day, data }: DayProps) => {
  return (
    <StyledDay>
      {day}
      <ul>
        {data
          ? data.map((item) => <li key={item.id}>{item.company_name}</li>)
          : null}
      </ul>
    </StyledDay>
  );
};

export default Day;

const StyledDay = styled.div``;
