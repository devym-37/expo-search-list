# Expo Search List App

Expo Search List는 GitHub 저장소를 검색하고 결과를 표시하는 React Native 기반의 모바일 애플리케이션입니다. 이 프로젝트는 [Expo](https://expo.dev)를 사용하여 개발되었으며, 무한 스크롤, 자동완성 검색, 검색 결과 상세 보기 등의 기능을 제공합니다.

## 주요 기능

- 검색 화면

  1.  검색어 입력 후, 검색 결과를 보여줍니다.
  2.  검색어가 비어있을 시, 최근 검색어를 최대 10개까지 보여줍니다.
  3.  최근 검색어는 날짜기준으로 내림차순 정렬합니다.
  4.  최근 검색어 ‘삭제’ 또는 ‘전체 삭제’가 가능합니다.
  5.  최근 검색 내역은 앱 재시작 시에도 유지됩니다.
  6.  최근 검색어 선택 시, 검색 결과를 보여줍니다.

  - 추가 구현
    1. 검색어 입력 시, 자동완성을 보여줍니다.
    2. 자동완성 노출 시, 검색 날짜를 같이 보여줍니다.
    3. 자동완성은 최근 검색어에서 추출하여 사용합니다

- 검색 결과 화면

  1.  검색 결과를 List 형태로 보여줍니다.
  2.  총 검색 결과 수를 보여줍니다.
  3.  저장소 정보를 보여줍니다.
  4.  검색 결과 선택 시, WebView 를 통해 해당 저장소로 이동합니다.

  - 추가 구현
    1. Scroll 중간에 Next Page 를 미리 호출합니다.
    2. Next Page 를 로딩할 때, 로딩 상태를 보여줍니다.

## 기술 스택

- **React Native**
- **Expo**
- **TypeScript**
- **React Query**
- **Zustand**
- **Axios**
- **React Native Toast Message**
- **React Native Async Storage**
- **Lodash**
- **dayjs**

## 개선 사항

1. api base URL의 경우 추후 env 환경변수로 관리해야 합니다.
2. 현재 앱 재시작시에도 최근 검색어를 저장하기 위하여 async-storage를 사용 중이지만, 추후에는 mmkv 라이브러리로 변경하면 데이터를 읽어오는 성능에서 빠른 성능을 경험할 수 있을 것 같습니다.
3. 검색 결과 화면에서 현재 React-Native FlatList를 사용 중이고, useCallback, useMemo 등을 이용한 memoization으로서 최적화를 진행하지 않았지만, 추후 성능상 고려가 필요할 경우, 적용하면 될 것 같습니다. 해당 부분으로 적용하더라도, 성능상 개선되지 않는다면, FlashList 적용을 고려하면 좋을 것 같습니다.
