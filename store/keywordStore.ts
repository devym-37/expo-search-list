import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

interface KeywordState {
  recentKeywords: Keyword[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearAllKeywords: () => void;
}

export type Keyword = {
  key: string;
  value: string;
  date: string;
};

const useKeywordStore = create<KeywordState>()(
  persist(
    (set, get) => ({
      recentKeywords: [],
      isLoading: true,
      setLoading: (loading: boolean) => {
        set((state) => ({ ...state, isLoading: loading }));
      },
      addKeyword: (keyword: string) => {
        const { recentKeywords } = get();

        const addKeyword = {
          key: `${recentKeywords.length + 1}`,
          value: keyword,
          date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };

        const newKeywords = [addKeyword, ...recentKeywords];

        set({ recentKeywords: newKeywords });
      },
      removeKeyword: (keywordKey: string) => {
        set((state) => ({
          recentKeywords: state.recentKeywords.filter(
            (k) => k.key !== keywordKey
          ),
        }));
      },
      clearAllKeywords: () => {
        set({ recentKeywords: [] });
      },
    }),
    {
      name: "keyword-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);

export default useKeywordStore;
