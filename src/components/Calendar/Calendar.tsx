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
      <div>
        <button type="button" onClick={() => changeMonth("prev")}>
          이전달
        </button>
        <h2>{formatDate(currentDate, "yyyy.MM")}</h2>
        <button type="button" onClick={() => changeMonth("next")}>
          다음달
        </button>
      </div>
      <StyledCalendar>
        {days.map((day) => (
          <Day
            key={day}
            day={day}
            data={filteredDutiesRecruitData(day) ?? []}
            showDetail={showDetail}
          />
        ))}
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

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;
