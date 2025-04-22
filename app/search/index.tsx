import React, { useEffect, useState } from "react";
import Screen from "@/components/ui/Screen";
import { useLocalSearchParams } from "expo-router";
import { SearchInput } from "@/components/ui/searchResult";
import { isEmpty } from "lodash";
import useKeywordStore from "@/store/keywordStore";
import SearchResultList from "@/components/ui/searchResult/SearchResultList";

const Search = () => {
  const addKeyword = useKeywordStore((state) => state.addKeyword);
  const params = useLocalSearchParams<{ keyword: string }>();

  const hasKeyword = !isEmpty(params?.keyword);

  const [keyword, setKeyword] = useState(params?.keyword || "");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (!isEmpty(params?.keyword)) {
      setSearchKeyword(params.keyword);
    }
  }, [params?.keyword]);

  const handleChangeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  const handleRemoveKeyword = () => {
    setKeyword("");
  };

  const handleSubmitEditing = (newKeyword: string) => {
    setSearchKeyword(newKeyword);
    addKeyword(newKeyword);
  };

  const handleClickAutoCompleteKeyword = (keyword: string) => {
    setSearchKeyword(keyword);
    setKeyword(keyword);
    addKeyword(keyword);
  };

  return (
    <Screen>
      <SearchInput
        keyword={keyword}
        isAutoFocus={!hasKeyword}
        onChangeKeyword={handleChangeKeyword}
        onRemoveKeyword={handleRemoveKeyword}
        onSubmitEditing={handleSubmitEditing}
      />

      <SearchResultList
        searchKeyword={searchKeyword}
        keyword={keyword}
        isShowAutoComplete={!hasKeyword}
        onClickKeyword={handleClickAutoCompleteKeyword}
      />
    </Screen>
  );
};

export default Search;
