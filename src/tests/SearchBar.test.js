import SearchBar from "../components/SearchBar";
import { render } from "@testing-library/react";
import React from "react";

describe("SearchBar", () => {
  it("renders SearcBar", () => {
    render(<SearchBar query="" setQuery={null} search={null} />);
  });
  //   it("has placeholder", () => {});
});
