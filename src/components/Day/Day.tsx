"use client";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { CalendarItemData } from "../../types/recruit.ts";
import { getViewDayData } from "../../utils/calendar.ts";
import { useReadListStore } from "../../stores/useReadListStore.ts";

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
      <time dateTime={day}>{day}</time>
      <ul>
        {viewData &&
          viewData.map((group) => {
            const [first, second] = group;
            return (
              <li
                key={first.company_name + "_" + first.type}
                className="company-group"
              >
                <button
                  type="button"
                  onClick={() => handleClickCompany(!!second, first.id)}
                  className={
                    !second && readList.includes(first.id) ? "visited" : ""
                  }
                >
                  <strong>[{first.type === "start" ? "시" : "끝"}]</strong>
                  {first.company_name}
                </button>
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

  .visited {
    color: purple;
  }
`;
