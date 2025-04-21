import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ListRenderItemInfo,
} from "react-native";
import useKeywordStore, { Keyword } from "@/store/keywordStore";
import { isEmpty } from "lodash";
import Separator from "../common/Separator";
import { getHitSlop } from "@/utils/base";
import RecentKeywordItem from "./RecentKeywordItem";
import { keywordsLimit } from "@/constants/globalDefines";

const RecentKeywords = () => {
  const recentKeywords = useKeywordStore((state) => state.recentKeywords);
  const removeAllKeywords = useKeywordStore((state) => state.clearAllKeywords);

  const keywords = useMemo(() => {
    return recentKeywords.slice(0, keywordsLimit);
  }, [recentKeywords]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Keyword>) => {
    return <RecentKeywordItem keyword={item} />;
  }, []);

  if (isEmpty(keywords)) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>최근 검색</Text>

        <Pressable onPress={removeAllKeywords} hitSlop={getHitSlop()}>
          <Text style={styles.allDeleteText}>전체삭제</Text>
        </Pressable>
      </View>

      <FlatList
        data={keywords}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <Separator height={1} style={styles.separator} />
        )}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Separator height={16} />}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  allDeleteText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  keyword: {
    fontSize: 16,
    paddingVertical: 4,
  },
  separator: {
    backgroundColor: "#dddddd",
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
});

export default RecentKeywords;
