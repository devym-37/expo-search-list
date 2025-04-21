import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface KeywordState {
  recentKeywords: Keyword[];
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addKeyword: (keyword: Keyword) => void;
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
        console.log("here:>>>>");
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
