import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntIcons from "@expo/vector-icons/AntDesign";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { getHitSlop } from "@/utils/base";
import { isEmpty } from "lodash";

interface Props {
  keyword: string;
  isAutoFocus: boolean;
  onChangeKeyword: (keyword: string) => void;
  onRemoveKeyword: () => void;
  onSubmitEditing: (keyword: string) => void;
}

const SearchInput = ({
  keyword,
  isAutoFocus,
  onChangeKeyword,
  onRemoveKeyword,
  onSubmitEditing,
}: Props) => {
  const router = useRouter();

  const handleClickCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.inputContainer}>
          <EvilIcons name="search" size={24} color="#858585" />
          <TextInput
            placeholder="저장소 검색"
            value={keyword}
            onChangeText={onChangeKeyword}
            style={{ flexShrink: 1 }}
            autoFocus={isAutoFocus}
            returnKeyType="search"
            onSubmitEditing={(event) => onSubmitEditing(event.nativeEvent.text)}
          />
        </View>
        {!isEmpty(keyword) && (
          <Pressable onPress={onRemoveKeyword} hitSlop={getHitSlop()}>
            <AntIcons name="closecircle" size={16} color="#858585" />
          </Pressable>
        )}
      </View>

      <Pressable onPress={handleClickCancel} hitSlop={getHitSlop()}>
        <Text style={styles.cancelText}>취소</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 4,
  },
  itemContainer: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "#dddddd",
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "#858585",
  },
  cancelText: {
    fontSize: 16,
    color: "purple",
    fontWeight: "bold",
  },
});

export default SearchInput;
