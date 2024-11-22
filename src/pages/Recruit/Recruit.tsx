"use client";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters, getRecruits } from "../../api/calendar.ts";

interface RecruitProps {}

const Recruit = ({}: RecruitProps) => {
  const recruitData = useQuery({
    queryKey: ["RECRUITS"],
    queryFn: getRecruits,
  });

  const filtersData = useQuery({
    queryKey: ["DUTIES"],
    queryFn: getFilters,
  });

  return <StyledRecruit>calendar</StyledRecruit>;
};

export default Recruit;

const StyledRecruit = styled.div``;
