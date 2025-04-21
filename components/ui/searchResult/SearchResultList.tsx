import React from "react";
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

interface Props {
  searchKeyword: string;
}

const SearchResultList = ({ searchKeyword }: Props) => {
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

  if (!isShowResultList) {
    return null;
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
