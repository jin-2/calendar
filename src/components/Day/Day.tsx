"use client";
import { useMemo, useRef, useState } from "react";
import styled from "@emotion/styled";
import { CalendarItemData } from "../../types/recruit.ts";
import { formatDate, getViewDayData } from "../../utils/calendar.ts";
import { useReadListStore } from "../../stores/useReadListStore.ts";
import CompanyNameButton from "../CompanyNameButton/CompanyNameButton.tsx";
import Tooltip from "../Tooltip/Tooltip.tsx";

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
  const [showParentId, setShowParentId] = useState<null | number>(null);
  const readList = useReadListStore((state) => state.readList);
  const addReadList = useReadListStore((state) => state.addReadList);
  const tooltipRefs = useRef<Map<number, HTMLParagraphElement>>(new Map());

  const handleClickCompany = (hasChild: boolean, id: number) => {
    if (hasChild) {
      setShowParentId((prevId) => (prevId !== id ? id : null));
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
                  ref={(el) => {
                    if (el) tooltipRefs.current.set(first.id, el);
                  }}
                  recruitmentPeriodType={first.type}
                  onClick={() => handleClickCompany(!!second, first.id)}
                  className={
                    !second && readList.includes(first.id) ? "visited" : ""
                  }
                >
                  {first.company_name}
                </CompanyNameButton>
                {second && showParentId === first.id ? (
                  <Tooltip
                    targetRef={{
                      current: tooltipRefs.current.get(first.id) || null,
                    }}
                    onClose={() => setShowParentId(null)}
                  >
                    <ul className="company-group-postings">
                      {group.map((item) => (
                        <StyledCompanyPosting key={item.id}>
                          <p
                            role="button"
                            onClick={() => handleClickCompany(false, item.id)}
                            className={
                              readList.includes(item.id) ? "visited" : ""
                            }
                          >
                            {item.title}
                          </p>
                        </StyledCompanyPosting>
                      ))}
                    </ul>
                  </Tooltip>
                ) : null}
              </li>
            );
          })}
      </ul>
    </StyledDay>
  );
};

export default Day;

const StyledCompanyPosting = styled.li`
  padding: 8px;
  cursor: pointer;

  & + & {
    border-top: 1px solid #eee;
  }

  .visited {
    color: #999;
  }
`;

const StyledDay = styled.div`
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .company-group-postings {
    white-space: nowrap;
  }

  .day-head {
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
  }
`;
