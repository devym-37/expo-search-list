import api from "./api";

/**
 * GitHub 저장소 검색 API 호출
 * @param keyword 검색 키워드
 * @param page 페이지 번호
 * @returns 검색 결과 데이터
 */

export const getKeywordResults = async (keyword: string, page: number) => {
  try {
    const response = await api.get("/search/repositories", {
      params: {
        q: keyword,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching keyword results:", error);
    throw error;
  }
};
