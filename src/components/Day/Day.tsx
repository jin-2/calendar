"use client";
import styled from "@emotion/styled";

interface DayProps {
  day: string; // yyyy-MM-dd
}

const Day = ({ day }: DayProps) => {
  return <StyledDay>{day}</StyledDay>;
};

export default Day;

const StyledDay = styled.div``;
