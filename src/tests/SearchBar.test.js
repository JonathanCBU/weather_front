/**
 * @jest-environment jsdom
 */
import SearchBar from "../components/SearchBar";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("SearchBar", () => {
  it("renders SearchBar", () => {
    const searchBar = render(
      <SearchBar query="" setQuery={null} search={null} />
    );
    let ph = searchBar.getByPlaceholderText("city name or zip");
    expect(ph.placeholder).toBe("city name or zip");
  });
  //   it("has placeholder", () => {});
});
