"use client";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import { getHierarchyDuties } from "../../utils/filter.ts";
import DutyItem from "../DutyItem/DutyItem.tsx";

interface FilterDutiesProps {}

const FilterDuties = ({}: FilterDutiesProps) => {
  const { data } = useQuery({
    queryKey: ["DUTIES"],
    queryFn: getFilters,
  });

  const { dutyMap, rootDutyIds } = getHierarchyDuties(data ?? []);

  return (
    <StyledFilterDuties>
      <ul>
        {rootDutyIds.map((item) => {
          const data = dutyMap.get(item);
          return data ? <DutyItem key={data.id} data={data} /> : null;
        })}
      </ul>
    </StyledFilterDuties>
  );
};

export default FilterDuties;

const StyledFilterDuties = styled.div``;
