import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface Props {
  avatarUrl: string;
  title: string;
  description: string;
}

const SearchResultItem = ({ avatarUrl, title, description }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarImage}>
        <Image source={avatarUrl} style={styles.avatarImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 16,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#858585",
  },
});

export default SearchResultItem;
