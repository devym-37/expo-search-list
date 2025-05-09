import React, { useEffect } from "react";
import {
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { isEmpty } from "lodash";
import { useRouter } from "expo-router";
import { SearchKeywordResult } from "@/api/types/search.type";
import { useSearchResult } from "@/hooks/searchResult/useSearchResult";
import SearchResultItem from "./SearchResultItem";
import SearchResultHeader from "./SearchResultHeader";
import SearchEmptyItem from "./SearchEmptyItem";
import Separator from "../common/Separator";
import SearchKeywordAutoComplete from "./SearchKeywordAutoComplete";
import Toast from "react-native-toast-message";

interface Props {
  searchKeyword: string;
  keyword: string;
  isShowAutoComplete: boolean;
  onClickKeyword: (keyword: string) => void;
}

/**
 * SearchResultList 컴포넌트
 * 검색 결과를 표시하거나, 자동완성 목록을 보여줍니다.
 */

const SearchResultList = ({
  searchKeyword,
  keyword,
  isShowAutoComplete,
  onClickKeyword,
}: Props) => {
  const router = useRouter();

  const {
    keywordResults,
    totalCount,
    isLoading,
    isError,
    isFetching,
    onEndReached,
  } = useSearchResult(searchKeyword);

  const isShowResultList = !isEmpty(searchKeyword) && !isEmpty(keywordResults);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        text1: "목록 호출에 실패했습니다.",
        position: "bottom",
      });
    }
  }, [isError]);

  const handleClickSearchItem = (url: string) => {
    router.push({
      pathname: "/webview",
      params: { url },
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<SearchKeywordResult>) => {
    return (
      <TouchableOpacity onPress={() => handleClickSearchItem(item.html_url)}>
        <SearchResultItem
          avatarUrl={item.owner.avatar_url}
          title={item.name}
          description={item.owner.login}
        />
      </TouchableOpacity>
    );
  };

  if (!isShowResultList && !isLoading) {
    return (
      <SearchKeywordAutoComplete
        keyword={keyword}
        isShowAutoComplete={isShowAutoComplete}
        onClickKeyword={onClickKeyword}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <SearchResultHeader totalCount={totalCount} />
          <FlatList
            data={keywordResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            ListEmptyComponent={<SearchEmptyItem />}
            ListFooterComponent={
              isFetching ? <ActivityIndicator size="small" /> : null
            }
            ItemSeparatorComponent={() => (
              <Separator height={1} style={styles.separator} />
            )}
            bounces={!isEmpty(keywordResults)}
            contentContainerStyle={styles.contentContainer}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  separator: {
    backgroundColor: "#dddddd",
  },
  loadingContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchResultList;
