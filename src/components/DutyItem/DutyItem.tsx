"use client";
import styled from "@emotion/styled";
import { HierarchyDutyData } from "../../types/recruit.ts";

interface DutyItemProps {
  data: HierarchyDutyData;
}

const DutyItem = ({ data }: DutyItemProps) => {
  return (
    <StyledDutyItem>
      <label>
        <input type="checkbox" value={data.id} />
        {data.name}
      </label>
    </StyledDutyItem>
  );
};

export default DutyItem;

const StyledDutyItem = styled.li``;
