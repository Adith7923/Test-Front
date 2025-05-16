import React from "react";
import { action } from "@storybook/addon-actions";
import SearchBar from "./Searchbar";

export default {
  title: "components/SearchBar",
  component: SearchBar,
};

export const SearchbarLarge = {
  args: {
    variant: "large",
    placeholder: "Search...",
    onSearch: action("searched"),
  },
};

export const SearchbarSmall = {
  args: {
    variant: "small",
    placeholder: "Search...",
    onSearch: action("searched"),
  },
};

export const SearchbarCustom = {
  args: {
    variant: "custom",
    placeholder: "Search...",
    onSearch: action("searched"),
  },
};
