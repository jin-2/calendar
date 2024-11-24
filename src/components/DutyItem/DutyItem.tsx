"use client";
import styled from "@emotion/styled";
import { ExpandedNodeId, HierarchyDutyData } from "../../types/recruit.ts";

interface DutyItemProps {
  id: number;
  expandedNodeId: ExpandedNodeId;
  getDataById: (id: number) => HierarchyDutyData | undefined;
  onExpand: (id: number) => void;
  onChangeCheckbox: (id: number, isSelected: boolean) => void;
  calcSelectedCount: (ids: number[]) => number;
}

const DutyItem = ({ id, ...restProps }: DutyItemProps) => {
  const {
    expandedNodeId,
    getDataById,
    onExpand,
    onChangeCheckbox,
    calcSelectedCount,
  } = restProps;

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
      <p onClick={handleClick} className="duty-item">
        <label>
          <input
            type="checkbox"
            value={id}
            checked={data.isSelected}
            onChange={handleChange}
          />
        </label>
        {data.name} {calcSelectedCount([id]) || ""}
        <span className="arrow">{data.children.length ? "▶" : null}</span>
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
  font-size: 16px;

  .duty-item {
    display: inline-block;
    padding: 4px 10px;

    > label {
      margin-right: 4px;
    }
  }

  .filter-group {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 260px;
    width: 100%;
  }

  .filter-group.show {
    opacity: 1;
    visibility: visible;
  }

  .arrow {
    color: #999;
    margin-left: 4px;
    font-size: 10px;
    vertical-align: middle;
  }
`;
