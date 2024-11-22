export type RecruitData = {
  id: number;
  company_name: string;
  title: string;
  start_time: string; // "2024-05-31 17:42:00";
  end_time: string; // "2024-06-09 23:59:00";
  image_url: string; // "https://daoift3qrrnil.cloudfront.net/content_images/images/000/258/398/webp/240531_%EA%B8%B0%EA%B3%84%EC%82%AC%EC%97%85%EB%B3%B8%EB%B6%80_%EC%84%9C%EB%B9%84%EC%8A%A4%EB%B6%80.webp?1717145255";
  duty_ids: number[]; // [58, 112, 115];
};

export type RecruitMapData = Map<string, RecruitData>;

export type CalendarItemData = Pick<
  RecruitData,
  "id" | "company_name" | "duty_ids" | "title"
> & {
  type: "start" | "end";
};

export type CalendarMapData = Map<string, CalendarItemData[]>;

export type DutyData = {
  id: number;
  name: string;
  parent_id: null | number;
};
