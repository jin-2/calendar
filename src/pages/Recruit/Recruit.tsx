"use client";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters, getRecruits } from "../../api/calendar.ts";
import Calendar from "../../components/Calendar/Calendar.tsx";
import { useMemo } from "react";
import { getArrayToMap } from "../../utils/getArrayToMap.ts";
import type { RecruitData } from "../../types/recruit.ts";

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

  const recruitDataToMap = useMemo(() => {
    return getArrayToMap<RecruitData>(recruitData.data ?? [], "id");
  }, [recruitData.data]);

  console.log(recruitDataToMap);

  return (
    <StyledRecruit>
      <Calendar />
    </StyledRecruit>
  );
};

export default Recruit;

const StyledRecruit = styled.div``;
