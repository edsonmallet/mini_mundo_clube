import create from "zustand";
import { IResults } from "../interfaces/results";

type State = {
  result: IResults | null;
  setResult: (result: IResults | null) => void;
};

export const useResultStore = create<State>((set) => ({
  result: null,
  setResult: (result: IResults | null) => set(() => ({ result })),
}));
