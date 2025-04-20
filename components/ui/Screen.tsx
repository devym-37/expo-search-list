import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";

/**
 * 화면 기본 레이아웃 컴포넌트
 *
 * SafeAreaView를 기반으로 하여 기기의 노치(notch), 홈 인디케이터 등을 고려한
 * 안전한 영역 내에서 콘텐츠를 표시합니다. 기본 배경색은 흰색이며,
 * 화면 전체를 차지하도록 flex: 1이 적용되어 있습니다.
 *
 * @param {React.ReactNode} children - 컴포넌트 내부에 렌더링할 자식 요소
 * @param {SafeAreaViewProps} props - SafeAreaView의 모든 props를 전달
 * @returns {JSX.Element} 스타일이 적용된 SafeAreaView 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <Screen>
 *   <Text>내용</Text>
 * </Screen>
 *
 * @example
 * // 추가 스타일 적용
 * <Screen style={{ backgroundColor: 'lightblue' }}>
 *   <Text>내용</Text>
 * </Screen>
 */

type Props = PropsWithChildren<SafeAreaViewProps>;

const Screen = ({ children, ...props }: Props) => {
  return (
    <SafeAreaView style={styles.container} {...props}>
      <ThemedView style={styles.themeContainer}>{children}</ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  themeContainer: {
    flex: 1,
  },
});

export default Screen;
