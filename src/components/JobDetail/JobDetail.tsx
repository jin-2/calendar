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
          <button
            type="button"
            className="detail-navigation prev"
            onClick={() => handleClickNext(prevContent.id)}
          >
            &lt; {prevContent.company_name}
          </button>
        )}
        {nextContent && (
          <button
            type="button"
            className="detail-navigation next"
            onClick={() => handleClickNext(nextContent.id)}
          >
            {nextContent.company_name} &gt;
          </button>
        )}
        {currentContent && (
          <>
            <div className="content-text-wrap">
              <h3 className="company-name">{currentContent.company_name}</h3>
              <h4 className="recruitment-title">{currentContent.title}</h4>
              <p>
                -{" "}
                {currentContent.duty_ids
                  .map((id) => dutiesMap.get(id)?.name)
                  .join(", ")}
              </p>
              <p>
                - {formatDate(new Date(currentContent.start_time), TIME_FORMAT)}{" "}
                ~ {formatDate(new Date(currentContent.end_time), TIME_FORMAT)}
              </p>
            </div>
            <div className="content-image-wrap">
              <img src={currentContent.image_url} alt="" />
            </div>
          </>
        )}
      </div>
    </StyledJobDetail>
  );
};

export default JobDetail;

const StyledJobDetail = styled.div`
  padding: 40px 0;

  .content-image-wrap {
    margin-top: 40px;

    img {
      width: 100%;
    }
  }

  .content-text-wrap {
    padding-left: 20px;
    padding-right: 20px;

    p + p {
      margin-top: 4px;
    }
  }

  .recruitment-title {
    margin-top: 4px;
    margin-bottom: 10px;
    font-size: 24px;
  }

  .detail-navigation {
    position: fixed;
    top: 45%;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  .prev {
    left: 10px;
    text-align: left;
  }

  .next {
    right: 10px;
    text-align: right;
  }
`;
