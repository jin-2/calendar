"use client";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import {
  getHierarchyDuties,
  updateSelectionToParent,
  updateSelectionToTargetAndChild,
} from "../../utils/filter.ts";
import DutyItem from "../DutyItem/DutyItem.tsx";
import type { DutyData, ExpandedNodeId } from "../../types/recruit.ts";

interface FilterDutiesProps {}

const FilterDuties = ({}: FilterDutiesProps) => {
  const { data } = useQuery({
    queryKey: ["DUTIES"],
    queryFn: getFilters,
  });

  const { rootDutyIds } = getHierarchyDuties(data ?? []);

  const [mapData, setMapData] = useState(new Map());

  useEffect(() => {
    if (data) {
      const { dutyMap } = getHierarchyDuties(data);
      setMapData(dutyMap);
    }
  }, [data]);

  const [expandedNodeId, setExpandedNodeId] = useState<ExpandedNodeId>([
    null,
    null,
  ]);

  const getDataById = useCallback(
    (id: DutyData["id"]) => mapData.get(id),
    [mapData]
  );

  const handleExpand = (id: number) => {
    const data = mapData.get(id);
    if (!data) return;

    if (data.children.length === 0) return;

    if (data.parent_id !== null) {
      setExpandedNodeId([data.parent_id, data.id]);
      return;
    }

    setExpandedNodeId([data.id, null]);
  };

  const handleChangeDutyCheckbox = (id: number, isSelected: boolean) => {
    const data = mapData.get(id);
    if (!data) return;

    setMapData((prev) => {
      const newMap = new Map(prev);
      updateSelectionToTargetAndChild(newMap, data, isSelected);
      updateSelectionToParent(newMap, data);

      return newMap;
    });
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
            onChangeCheckbox={handleChangeDutyCheckbox}
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
