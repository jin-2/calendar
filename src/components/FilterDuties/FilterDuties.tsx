"use client";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import {
  getHierarchyDuties,
  getSelectedDutyIds,
  updateSelectionToParent,
  updateSelectionToTargetAndChild,
} from "../../utils/filter.ts";
import DutyItem from "../DutyItem/DutyItem.tsx";
import { DutyData, ExpandedNodeId } from "../../types/recruit.ts";
import { useDutyStore } from "../../stores/useDutyStore.ts";

interface FilterDutiesProps {
  setFilters: (filters: number[]) => void;
}

const FilterDuties = ({ setFilters }: FilterDutiesProps) => {
  const { data } = useQuery({
    queryKey: ["DUTIES"],
    queryFn: getFilters,
  });

  const { rootDutyIds } = getHierarchyDuties(data ?? []);

  const [dutiesMapForView, setDutiesMapForView] = useState(new Map());
  const setDutiesMap = useDutyStore((state) => state.setDutiesMap);

  useEffect(() => {
    if (data) {
      const { dutyMap } = getHierarchyDuties(data);
      setDutiesMapForView(dutyMap);
      setDutiesMap(dutyMap);
    }
  }, [data]);

  useEffect(() => {
    setFilters(getSelectedDutyIds(dutiesMapForView));
  }, [dutiesMapForView]);

  const [expandedNodeId, setExpandedNodeId] = useState<ExpandedNodeId>([
    null,
    null,
  ]);

  const getDataById = useCallback(
    (id: DutyData["id"]) => dutiesMapForView.get(id),
    [dutiesMapForView]
  );

  const handleExpand = (id: number) => {
    const data = dutiesMapForView.get(id);
    if (!data) return;

    if (data.children.length === 0) return;

    if (data.parent_id !== null) {
      setExpandedNodeId([data.parent_id, data.id]);
      return;
    }

    setExpandedNodeId([data.id, null]);
  };

  const handleChangeDutyCheckbox = (id: number, isSelected: boolean) => {
    const data = dutiesMapForView.get(id);
    if (!data) return;

    setDutiesMapForView((prev) => {
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
