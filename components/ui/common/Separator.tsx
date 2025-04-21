import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";

/**
 * 구분선(Separator) 컴포넌트
 *
 * UI 요소 사이에 시각적인 구분선을 제공하는 컴포넌트입니다.
 * 가로(horizontal) 또는 세로(vertical) 구분선으로 사용할 수 있으며,
 * 너비(width)나 높이(height)를 지정하여 크기를 조절할 수 있습니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {number} [props.width] - 구분선의 너비 (세로 구분선에 사용)
 * @param {number} [props.height] - 구분선의 높이 (가로 구분선에 사용)
 * @param {StyleProp<ViewProps>} [props.style] - 추가적인 스타일을 적용하기 위한 스타일 객체
 * @returns {JSX.Element} 스타일이 적용된 구분선 컴포넌트
 *
 * @example
 * // 가로 구분선 (기본 높이: 1)
 * <Separator height={1} />
 *
 * @example
 * // 세로 구분선
 * <Separator width={1} height={20} />
 *
 * @example
 * // 커스텀 스타일 적용
 * <Separator height={2} style={{ backgroundColor: '#ddd', marginVertical: 10 }} />
 */

interface Props {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Separator = ({ width, height, style = {} }: Props) => {
  if (width) {
    return <View style={[{ width, height: 1 }, style]} />;
  }
  return <View style={[{ width: "100%", height }, style]} />;
};

export default Separator;
