import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * 내비게이션 헤더 컴포넌트
 *
 * 앱의 화면 상단에 표시되는 헤더 컴포넌트입니다.
 * 화면의 제목을 중앙에 표시하며, 기본적인 스타일과 레이아웃을 제공합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {string} props.title - 헤더에 표시될 제목 텍스트
 * @returns {JSX.Element} 스타일이 적용된 헤더 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <NavigationHeader title="홈 화면" />
 *
 * @example
 * // 페이지 컴포넌트 내에서 사용
 * const HomePage = () => (
 *   <View>
 *     <NavigationHeader title="홈" />
 *     <Text>페이지 내용</Text>
 *   </View>
 * );
 */

interface Props {
  title: string;
}

const NavigationHeader = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
});

export default NavigationHeader;
