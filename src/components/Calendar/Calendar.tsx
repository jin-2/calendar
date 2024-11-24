"use client";
import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { getRecruits } from "../../api/calendar.ts";
import { getMonthByWeek } from "../../utils/getMonthByWeek.ts";
import { getArrayToMap } from "../../utils/getArrayToMap.ts";
import { getCalendarData } from "../../utils/calendar.ts";
import Day from "../Day/Day.tsx";
import Modal from "../Modal/Modal.tsx";
import JobDetail from "../JobDetail/JobDetail.tsx";

interface CalendarProps {
  filters: number[];
}

const Calendar = ({ filters }: CalendarProps) => {
  const { data } = useQuery({
    queryKey: ["RECRUITS"],
    queryFn: getRecruits,
  });

  const days = getMonthByWeek(2024, 11);
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

  return (
    <>
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
