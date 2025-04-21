import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatNumberComma } from "@/utils/formatNumber";

interface Props {
  totalCount: number;
}

const SearchResultHeader = ({ totalCount }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${formatNumberComma(
        totalCount
      )}개 저장소`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#858585",
  },
});

export default SearchResultHeader;
