import { useInfiniteQuery } from "@tanstack/react-query";
import { getKeywordResults } from "@/api/apiActions";
import { queryKeys } from "@/constants/queryKeys";
import { flatten, isEmpty } from "lodash";
import { useCallback } from "react";
import { searchKeywordResultPageSize } from "@/constants/globalDefines";
import { SearchKeywordResultResponse } from "@/api/types/search.type";

/**
 * 검색 결과를 무한 스크롤 방식으로 가져오는 커스텀 훅
 * @param keyword 검색 키워드
 * @returns useInfiniteQuery의 반환값
 */

export const useSearchResult = (keyword: string) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<SearchKeywordResultResponse, Error>({
      queryKey: queryKeys.searchKeywordResult(keyword),
      queryFn: ({ pageParam = 1 }) =>
        getKeywordResults(keyword, pageParam as number),
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.items.length < searchKeywordResultPageSize) {
          return undefined;
        }

        const nextPage = (lastPageParam as number) + 1;

        return nextPage;
      },
      initialPageParam: 1,
      select: (data) => ({
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          items: page.items || [],
        })),
      }),
      enabled: !isEmpty(keyword),
    });

  const onEndReached = useCallback(() => {
    if (isLoading || isFetching || isError) {
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, isFetching, isError]);

  return {
    keywordResults: flatten(data?.pages.map((page) => page.items) ?? []),
    totalCount: data?.pages[0]?.total_count ?? 0,
    isLoading,
    isError,
    isFetching,
    onEndReached,
  };
};
