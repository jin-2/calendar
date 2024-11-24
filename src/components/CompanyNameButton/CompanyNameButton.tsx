"use client";
import { ReactNode } from "react";
import styled from "@emotion/styled";

interface CompanyNameButtonProps {
  recruitmentPeriodType: "start" | "end";
  className: string;
  children: ReactNode;
  onClick: () => void;
}

const CompanyNameButton = ({
  recruitmentPeriodType,
  className,
  children,
  onClick,
}: CompanyNameButtonProps) => {
  return (
    <StyledCompanyNameButton
      role="button"
      onClick={onClick}
      className={className}
    >
      {recruitmentPeriodType === "start" && (
        <strong className="label start">시</strong>
      )}
      {recruitmentPeriodType === "end" && (
        <strong className="label end">끝</strong>
      )}
      {children}
    </StyledCompanyNameButton>
  );
};

export default CompanyNameButton;

const StyledCompanyNameButton = styled.p`
  padding: 2px 4px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &.visited {
    color: #999;
  }

  .label {
    display: inline-block;
    margin-right: 2px;
    width: 14px;
    border-radius: 4px;
    line-height: 14px;
    background-color: #ddd;
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    vertical-align: text-top;

    &.start {
      background-color: #ff6813;
    }

    &.end {
      background-color: #3f4b5e;
    }
  }
`;
