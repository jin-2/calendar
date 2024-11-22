import { Duty, Recruit } from "../types/recruit.ts";

export async function getRecruits(): Promise<Recruit[]> {
  try {
    const res = await fetch(
      "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/recruits.json"
    );
    return await res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getFilters(): Promise<Duty[]> {
  try {
    const res = await fetch(
      "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/duties.json"
    );
    return await res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
