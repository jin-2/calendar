"use client";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "../../api/calendar.ts";
import {
  getHierarchyDuties,
  getSelectedCount,
  getSelectedDutyIds,
  updateSelectionToParent,
  updateSelectionToTargetAndChild,
} from "../../utils/filter.ts";
import DutyItem from "../DutyItem/DutyItem.tsx";
import { DutyData, ExpandedNodeId } from "../../types/recruit.ts";
import { useDutyStore } from "../../stores/useDutyStore.ts";
import { useDropdown } from "../../hooks/useDropdown.ts";

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
  const { isOpen, toggleDropdown, dropdownRef } = useDropdown();

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

  const calcSelectedCount = (ids: number[]) => {
    return ids.reduce((acc, id) => {
      return acc + getSelectedCount(dutiesMapForView, dutiesMapForView.get(id));
    }, 0);
  };

  return (
    <StyledFilterDuties ref={dropdownRef}>
      <div className="filter-button-wrap">
        <button type="button" onClick={toggleDropdown}>
          직무 선택 {calcSelectedCount(rootDutyIds) || ""}
        </button>
      </div>
      {isOpen && (
        <div className="filter-wrap">
          <ul className="root-filter-group">
            {rootDutyIds.map((id) => (
              <DutyItem
                key={id}
                id={id}
                expandedNodeId={expandedNodeId}
                getDataById={getDataById}
                onExpand={handleExpand}
                onChangeCheckbox={handleChangeDutyCheckbox}
                calcSelectedCount={calcSelectedCount}
              />
            ))}
          </ul>
        </div>
      )}
    </StyledFilterDuties>
  );
};

export default FilterDuties;

const StyledFilterDuties = styled.div`
  background-color: #fafafa;

  .filter-button-wrap {
    padding: 20px;

    > button {
      width: 100px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
    }
  }

  .filter-wrap {
    z-index: 1;
    position: absolute;
    width: 100%;
    padding: 40px;
    border-top: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    background-color: #fafafa;
  }

  .root-filter-group {
    position: relative;
  }
`;
