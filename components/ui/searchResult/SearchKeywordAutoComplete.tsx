import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Pressable,
} from "react-native";
import dayjs from "dayjs";
import useKeywordStore, { Keyword } from "@/store/keywordStore";
import Separator from "../common/Separator";

interface Props {
  keyword: string;
  isShowAutoComplete: boolean;
  onClickKeyword: (keyword: string) => void;
}

/**
 * SearchKeywordAutoComplete 컴포넌트
 * 최근 검색어를 기반으로 자동완성 추천 목록을 표시합니다.
 */

const SearchKeywordAutoComplete = ({
  keyword,
  isShowAutoComplete,
  onClickKeyword,
}: Props) => {
  const recentKeywords = useKeywordStore((state) => state.recentKeywords);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const autocompleteSuggestions = useMemo(() => {
    if (!keyword || keyword.length < 1) return [];
    // 중복 제거를 위한 Map (key: 소문자 변환된 value, value: 키워드 객체)
    const uniqueMap = new Map();

    // 키워드가 포함된 항목 필터링 및 중복 처리
    recentKeywords.forEach((item) => {
      if (item.value.toLowerCase().includes(keyword.toLowerCase())) {
        const lowerValue = item.value.toLowerCase();

        // Map에 없거나, 있어도 현재 항목의 날짜가 더 최신인 경우 업데이트
        if (
          !uniqueMap.has(lowerValue) ||
          new Date(item.date) > new Date(uniqueMap.get(lowerValue).date)
        ) {
          uniqueMap.set(lowerValue, item);
        }
      }
    });

    // Map의 값들을 배열로 변환하고 최대 5개까지 반환
    return Array.from(uniqueMap.values());
  }, [keyword, recentKeywords]);

  useEffect(() => {
    if (!isShowAutoComplete) {
      return;
    }

    setShowSuggestions(
      keyword.length > 0 && autocompleteSuggestions.length > 0
    );
  }, [isShowAutoComplete, keyword, autocompleteSuggestions]);

  const handleClickAutoCompleteItem = (autoCompleteKeyword: string) => {
    onClickKeyword(autoCompleteKeyword);
    setShowSuggestions(false);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Keyword>) => {
    return (
      <Pressable
        onPress={() => handleClickAutoCompleteItem(item.value)}
        style={styles.itemContainer}
      >
        <Text style={styles.itemText}>{item.value}</Text>

        <Text style={styles.itemDateText}>
          {dayjs(item.date).format("MM.DD")}
        </Text>
      </Pressable>
    );
  };

  if (!isShowAutoComplete || !showSuggestions) {
    return null;
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.key}
        data={autocompleteSuggestions}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => (
          <Separator height={1} style={styles.separator} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  separator: {
    backgroundColor: "#dddddd",
  },
  itemContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
  },
  itemDateText: {
    fontSize: 14,
    color: "#858585",
  },
});

export default SearchKeywordAutoComplete;
