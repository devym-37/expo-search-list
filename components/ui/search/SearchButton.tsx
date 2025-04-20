import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";

const SearchButton = () => {
  const router = useRouter();

  const handleClickSearch = () => {
    router.push("/search");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleClickSearch}
        style={styles.buttonContainer}
      >
        <EvilIcons name="search" size={24} color="#858585" />
        <Text style={styles.buttonText}>저장소 검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#dddddd",
    borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "#858585",
  },
});

export default SearchButton;
