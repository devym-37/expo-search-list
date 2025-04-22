import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import NavigationHeader from "@/components/ui/header/NavigationHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import Screen from "@/components/ui/Screen";
import FeatherIcons from "@expo/vector-icons/Feather";
import { getHitSlop } from "@/utils/base";
import { WebView as ReactNativeWebview } from "react-native-webview";
import { isEmpty } from "lodash";

export default function WebView() {
  const params = useLocalSearchParams<{ url: string }>();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const isShowWebView = !isEmpty(params?.url);

  return (
    <Screen>
      <NavigationHeader
        leftComponent={
          <Pressable onPress={handleGoBack} hitSlop={getHitSlop()}>
            <FeatherIcons name="arrow-left" size={24} color="#000" />
          </Pressable>
        }
      />
      {isShowWebView ? (
        <ReactNativeWebview source={{ uri: params?.url }} style={{ flex: 1 }} />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>URL이 없습니다.</Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
});
