"use client";
import styled from "@emotion/styled";
import Calendar from "../../components/Calendar/Calendar.tsx";
import FilterDuties from "../../components/FilterDuties/FilterDuties.tsx";

const Recruit = () => {
  return (
    <StyledRecruit>
      <FilterDuties />
      <Calendar />
    </StyledRecruit>
  );
};

export default Recruit;

const StyledRecruit = styled.div``;
