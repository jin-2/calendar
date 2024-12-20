"use client";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getRecruits } from "../../api/calendar.ts";
import { getMonthByWeek } from "../../utils/getMonthByWeek.ts";
import { getArrayToMap } from "../../utils/getArrayToMap.ts";
import { formatDate, getCalendarData } from "../../utils/calendar.ts";
import Day from "../Day/Day.tsx";
import Modal from "../Modal/Modal.tsx";
import JobDetail from "../JobDetail/JobDetail.tsx";
import { addMonths } from "date-fns/addMonths";

interface CalendarProps {
  filters: number[];
}

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const Calendar = ({ filters }: CalendarProps) => {
  const { data } = useQuery({
    queryKey: ["RECRUITS"],
    queryFn: getRecruits,
  });

  const now = new Date();
  const [days, setDays] = useState(getMonthByWeek(now));
  const [currentDate, setCurrentDate] = useState(now);
  const [currentDetailId, setCurrentDetailId] = useState<null | number>(null);

  const recruitDataToMap = useMemo(() => {
    return getArrayToMap(data ?? [], "id");
  }, [data]);

  const recruitDataByCalendar = useMemo(() => {
    return getCalendarData(data ?? []);
  }, [data]);

  const filteredDutiesRecruitData = (day: string) => {
    const list = recruitDataByCalendar.get(day) ?? [];
    if (!list) return [];

    if (filters.length === 0) return list;

    return list.filter((item) => {
      return item.duty_ids.some((dutyId) => filters.includes(dutyId));
    });
  };

  const orderedListForDetail = () => {
    const list = days.map((day) => filteredDutiesRecruitData(day));
    return list.flat().map(({ id }) => id);
  };

  const showDetail = (id: number) => {
    setCurrentDetailId(id);
  };

  const closeModal = () => {
    setCurrentDetailId(null);
  };

  const changeMonth = (to: "prev" | "next") => {
    const direction = to === "prev" ? -1 : 1;
    const date = addMonths(currentDate, direction);
    setCurrentDate(date);
    setDays(getMonthByWeek(date));
    return;
  };

  return (
    <>
      <StyledCalendarHeader>
        <button
          type="button"
          aria-label="이전 달 이동하기"
          onClick={() => changeMonth("prev")}
        >
          &lt;
        </button>
        <h2 className="year-month">{formatDate(currentDate, "yyyy.MM")}</h2>
        <button
          type="button"
          aria-label="다음 달 이동하기"
          onClick={() => changeMonth("next")}
        >
          &gt;
        </button>
      </StyledCalendarHeader>
      <StyledCalendar>
        <StyledWeekdays>
          {WEEKDAYS.map((dayName) => (
            <div className="calendar-head" key={dayName}>
              {dayName}
            </div>
          ))}
        </StyledWeekdays>
        <StyledMonth>
          {days.map((day) => (
            <Day
              key={day}
              day={day}
              data={filteredDutiesRecruitData(day) ?? []}
              showDetail={showDetail}
            />
          ))}
        </StyledMonth>
      </StyledCalendar>
      <Modal isOpen={currentDetailId !== null} onClose={closeModal}>
        <JobDetail
          recruitMapData={recruitDataToMap}
          orderedRecruitIdList={orderedListForDetail()}
          selectedId={currentDetailId!}
        />
      </Modal>
    </>
  );
};

export default Calendar;

const StyledCalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;

  .year-month {
    color: #ff6813;
  }

  button {
    padding: 10px;
    font-size: 20px;
    color: #666;
  }
`;

const StyledWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  .calendar-head {
    padding: 2px;
    background: #eee;
    color: #555;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
`;

const StyledMonth = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto;
  min-height: calc(100vh - 80px - 50px - 24px);
`;

const StyledCalendar = styled.div`
  border-left: 1px solid #f0f0f0;
`;
