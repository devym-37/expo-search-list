import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import useKeywordStore, { Keyword } from "@/store/keywordStore";
import AntIcons from "@expo/vector-icons/AntDesign";
import { getHitSlop } from "@/utils/base";

interface Props {
  keyword: Keyword;
}

const RecentKeywordItem = ({ keyword }: Props) => {
  const removeKeyword = useKeywordStore((state) => state.removeKeyword);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{keyword.value}</Text>

      <Pressable
        onPress={() => removeKeyword(keyword.key)}
        hitSlop={getHitSlop()}
      >
        <AntIcons name="closecircle" size={16} color="#858585" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  text: {
    fontSize: 18,
  },
});

export default RecentKeywordItem;
