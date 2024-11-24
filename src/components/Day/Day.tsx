"use client";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { CalendarItemData } from "../../types/recruit.ts";
import { formatDate, getViewDayData } from "../../utils/calendar.ts";
import { useReadListStore } from "../../stores/useReadListStore.ts";
import CompanyNameButton from "../CompanyNameButton/CompanyNameButton.tsx";

interface DayProps {
  day: string; // yyyy-MM-dd
  data: CalendarItemData[];
  showDetail: (id: number) => void;
}

const Day = ({ day, data, showDetail }: DayProps) => {
  const viewData = useMemo(() => {
    const map = getViewDayData(data);
    return Array.from(map.values());
  }, [data]);
  const [isShowGroup, setIsShowGroup] = useState(false);
  const readList = useReadListStore((state) => state.readList);
  const addReadList = useReadListStore((state) => state.addReadList);

  const handleClickCompany = (hasChild: boolean, id: number) => {
    if (hasChild) {
      setIsShowGroup((prev) => !prev);
      return;
    }
    addReadList(id);
    showDetail(id);
  };

  return (
    <StyledDay>
      <div className="day-head">
        <time dateTime={day}>{formatDate(new Date(day), "d")}</time>
      </div>
      <ul>
        {viewData &&
          viewData.map((group) => {
            const [first, second] = group;
            return (
              <li
                key={first.company_name + "_" + first.type}
                className="company-group"
              >
                <CompanyNameButton
                  recruitmentPeriodType={first.type}
                  onClick={() => handleClickCompany(!!second, first.id)}
                  className={
                    !second && readList.includes(first.id) ? "visited" : ""
                  }
                >
                  {first.company_name}
                </CompanyNameButton>
                {second ? (
                  <ul
                    className={`company-group-postings ${isShowGroup ? "show" : ""}`}
                  >
                    {group.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleClickCompany(false, item.id)}
                          className={
                            readList.includes(item.id) ? "visited" : ""
                          }
                        >
                          <strong>{item.type === "start" ? "시" : "끝"}</strong>
                          ){item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
      </ul>
    </StyledDay>
  );
};

export default Day;

const StyledDay = styled.div`
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .company-group {
    position: relative;
  }

  .company-group-postings {
    z-index: 1;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    background: antiquewhite;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .day-head {
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
  }
`;
