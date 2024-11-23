"use client";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import { getHierarchyDuties } from "../../utils/filter.ts";

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
          return data ? (
            <li key={data.id}>
              <label>
                <input type="checkbox" />
                {data.name}
              </label>
            </li>
          ) : null;
        })}
      </ul>
    </StyledFilterDuties>
  );
};

export default FilterDuties;

const StyledFilterDuties = styled.div``;
