"use client";
import { useState } from "react";
import styled from "@emotion/styled";
import { RecruitData, RecruitMapData } from "../../types/recruit.ts";
import { formatDate } from "../../utils/calendar.ts";
import { useDutyStore } from "../../stores/useDutyStore.ts";
import { useReadListStore } from "../../stores/useReadListStore.ts";

interface JobDetailProps {
  recruitMapData: RecruitMapData;
  orderedRecruitIdList: RecruitData["id"][];
  selectedId: RecruitData["id"];
}

const JobDetail = ({
  recruitMapData,
  orderedRecruitIdList,
  selectedId,
}: JobDetailProps) => {
  const TIME_FORMAT = "yyyy년 M월 d일 HH:mm";
  const [currentId, setCurrentId] = useState(selectedId);
  const dutiesMap = useDutyStore((state) => state.dutiesMap);
  const addReadList = useReadListStore((state) => state.addReadList);

  const getContent = () => {
    const currentIndex = orderedRecruitIdList.findIndex(
      (id) => id === currentId
    );
    const prevContent = recruitMapData.get(
      orderedRecruitIdList[currentIndex - 1]
    );
    const nextContent = recruitMapData.get(
      orderedRecruitIdList[currentIndex + 1]
    );
    const currentContent = recruitMapData.get(
      orderedRecruitIdList[currentIndex]
    );
    return [prevContent, currentContent, nextContent];
  };
  const [prevContent, currentContent, nextContent] = getContent();

  const handleClickNext = (id: number) => {
    setCurrentId(id);
    addReadList(id);
  };

  return (
    <StyledJobDetail>
      <div>
        {prevContent && (
          <button type="button" onClick={() => handleClickNext(prevContent.id)}>
            이전: {prevContent.company_name}
          </button>
        )}
        {nextContent && (
          <button type="button" onClick={() => handleClickNext(nextContent.id)}>
            다음: {nextContent.company_name}
          </button>
        )}
        {currentContent && (
          <div>
            <h3>{currentContent.company_name}</h3>
            <h4>{currentContent.title}</h4>
            <p>
              {currentContent.duty_ids
                .map((id) => dutiesMap.get(id)?.name)
                .join(", ")}
            </p>
            <p>
              {formatDate(new Date(currentContent.start_time), TIME_FORMAT)} ~{" "}
              {formatDate(new Date(currentContent.end_time), TIME_FORMAT)}
            </p>
            <div className="content-image-wrap">
              <img src={currentContent.image_url} alt="" />
            </div>
          </div>
        )}
      </div>
    </StyledJobDetail>
  );
};

export default JobDetail;

const StyledJobDetail = styled.div`
  padding: 20px;

  .content-image-wrap {
    img {
      width: 100%;
    }
  }
`;
