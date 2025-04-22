import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SearchEmptyItem = () => {
  return (
    <View style={styles.container}>
      <Text>검색 결과가 없습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchEmptyItem;
