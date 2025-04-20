import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface KeywordState {
  recentKeywords: Keyword[];
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (keyword: string) => void;
  clearAllKeywords: () => void;
}

type Keyword = {
  key: string;
  value: string;
  date: string;
};

const useKeywordStore = create<KeywordState>()(
  persist(
    (set, get) => ({
      recentKeywords: [],
      addKeyword: (keyword: Keyword) => {
        const { recentKeywords } = get();

        const newKeywords = [keyword, ...recentKeywords];

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
    }
  )
);

export default useKeywordStore;
