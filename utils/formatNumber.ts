/**
 * 숫자를 1,000 단위로 콤마(,)를 추가하여 포맷팅하는 함수
 * @param num 포맷팅할 숫자
 * @returns 콤마가 추가된 문자열
 */

export const formatNumberComma = (num: number): string => {
  const numString = num.toString();
  return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
