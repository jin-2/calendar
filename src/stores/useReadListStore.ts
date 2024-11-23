import { create } from "zustand";

type ReadListState = {
  readList: number[];
  addReadList: (id: number) => void;
};

export const useReadListStore = create<ReadListState>()((set) => ({
  readList: [],
  addReadList: (id) =>
    set((state) => ({
      readList: [...state.readList, id],
    })),
}));
