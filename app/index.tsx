import React from "react";
import Screen from "@/components/ui/Screen";
import NavigationHeader from "@/components/ui/header/NavigationHeader";
import Separator from "@/components/ui/common/Separator";
import { RecentKeywords, SearchButton } from "@/components/ui/search";
import useKeywordStore from "@/store/keywordStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Home = () => {
  const isLoading = useKeywordStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Screen>
      <NavigationHeader title="Search" />
      <Separator height={8} />
      <SearchButton />
      <Separator height={16} />
      <RecentKeywords />
    </Screen>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
