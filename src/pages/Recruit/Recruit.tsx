"use client";
import { useState } from "react";
import styled from "@emotion/styled";
import Calendar from "../../components/Calendar/Calendar.tsx";
import FilterDuties from "../../components/FilterDuties/FilterDuties.tsx";

const Recruit = () => {
  const [selectedDuties, setSelectedDuties] = useState<number[]>([]);

  return (
    <StyledRecruit>
      <FilterDuties setFilters={setSelectedDuties} />
      <Calendar filters={selectedDuties} />
    </StyledRecruit>
  );
};

export default Recruit;

const StyledRecruit = styled.div``;
