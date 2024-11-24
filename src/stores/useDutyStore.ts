import { create } from "zustand";
import { DutyMapData } from "../types/recruit.ts";

type DutyState = {
  dutiesMap: DutyMapData;
  setDutiesMap: (data: DutyMapData) => void;
};

export const useDutyStore = create<DutyState>()((set) => ({
  dutiesMap: new Map(),
  setDutiesMap: (data) =>
    set(() => ({
      dutiesMap: data,
    })),
}));
