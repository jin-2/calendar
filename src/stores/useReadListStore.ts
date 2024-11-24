import { create } from "zustand";

type ReadListState = {
  readList: number[];
  addReadList: (id: number) => void;
};

export const useReadListStore = create<ReadListState>()((set) => ({
  readList: [],
  addReadList: (id) =>
    set((state) => {
      if (!state.readList.includes(id)) {
        return { readList: [...state.readList, id] };
      }
      return state;
    }),
}));
