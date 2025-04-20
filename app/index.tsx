import React from "react";
import Screen from "@/components/ui/Screen";
import NavigationHeader from "@/components/ui/header/NavigationHeader";
import Separator from "@/components/ui/common/Separator";
import { SearchButton } from "@/components/ui/search";

const Home = () => {
  return (
    <Screen>
      <NavigationHeader title="Search" />
      <Separator height={8} />
      <SearchButton />
    </Screen>
  );
};

export default Home;
