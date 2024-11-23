"use client";
import styled from "@emotion/styled";
import { ExpandedNodeId, HierarchyDutyData } from "../../types/recruit.ts";

interface DutyItemProps {
  id: number;
  expandedNodeId: ExpandedNodeId;
  getDataById: (id: number) => HierarchyDutyData | undefined;
  onExpand: (id: number) => void;
  onChangeCheckbox: (id: number, isSelected: boolean) => void;
}

const DutyItem = ({ id, ...restProps }: DutyItemProps) => {
  const { expandedNodeId, getDataById, onExpand, onChangeCheckbox } = restProps;

  const data = getDataById(id);
  if (!data) {
    return null;
  }

  const isExpanded = expandedNodeId.includes(data.id);

  const handleClick = () => {
    onExpand(id);
  };

  const handleChange = () => {
    onChangeCheckbox(data.id, !data.isSelected);
  };

  return (
    <StyledDutyItem>
      <p onClick={handleClick}>
        <label>
          <input
            type="checkbox"
            value={id}
            checked={data.isSelected}
            onChange={handleChange}
          />
        </label>
        {data.name}
      </p>
      {data.children.length ? (
        <ul className={`filter-group ${isExpanded ? "show" : ""}`}>
          {data.children.map((childId) => (
            <DutyItem key={childId} id={childId} {...restProps} />
          ))}
        </ul>
      ) : null}
    </StyledDutyItem>
  );
};

export default DutyItem;

const StyledDutyItem = styled.li`
  .filter-group {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 260px;
    width: 100%;
    background: #fff;
  }

  .filter-group.show {
    opacity: 1;
    visibility: visible;
  }
`;
