"use client";
import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import { getHierarchyDuties } from "../../utils/filter.ts";
import DutyItem from "../DutyItem/DutyItem.tsx";
import { DutyData, ExpandedNodeId } from "../../types/recruit.ts";

interface FilterDutiesProps {}

const FilterDuties = ({}: FilterDutiesProps) => {
  const { data } = useQuery({
    queryKey: ["DUTIES"],
    queryFn: getFilters,
  });

  const { dutyMap, rootDutyIds } = getHierarchyDuties(data ?? []);

  const [expandedNodeId, setExpandedNodeId] = useState<ExpandedNodeId>([
    null,
    null,
  ]);

  const getDataById = useCallback(
    (id: DutyData["id"]) => dutyMap.get(id),
    [dutyMap]
  );

  const handleExpand = (id: number) => {
    const data = dutyMap.get(id);
    if (!data) return;

    if (data.children.length === 0) return;

    if (data.parent_id !== null) {
      setExpandedNodeId([data.parent_id, data.id]);
      return;
    }

    setExpandedNodeId([data.id, null]);
  };

  return (
    <StyledFilterDuties>
      <ul className="root-filter-group">
        {rootDutyIds.map((id) => (
          <DutyItem
            key={id}
            id={id}
            expandedNodeId={expandedNodeId}
            getDataById={getDataById}
            onExpand={handleExpand}
          />
        ))}
      </ul>
    </StyledFilterDuties>
  );
};

export default FilterDuties;

const StyledFilterDuties = styled.div`
  position: relative;
`;
