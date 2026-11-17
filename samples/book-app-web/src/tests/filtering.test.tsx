import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("returns the same title-search results for lowercase and uppercase queries", () => {
    // Arrange
    const lowercaseFilters = {
      ...defaultFilters,
      searchTerm: "hobbit"
    };
    const uppercaseFilters = {
      ...defaultFilters,
      searchTerm: "HOBBIT"
    };

    // Act
    const lowercaseResults = filterBooks(books, lowercaseFilters);
    const uppercaseResults = filterBooks(books, uppercaseFilters);

    // Assert
    expect(lowercaseResults).toEqual(uppercaseResults);
    expect(lowercaseResults.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it("returns the same author-search results for lowercase and uppercase queries", () => {
    // Arrange
    const lowercaseFilters = {
      ...defaultFilters,
      searchTerm: "andy weir"
    };
    const uppercaseFilters = {
      ...defaultFilters,
      searchTerm: "ANDY WEIR"
    };

    // Act
    const lowercaseResults = filterBooks(books, lowercaseFilters);
    const uppercaseResults = filterBooks(books, uppercaseFilters);

    // Assert
    expect(lowercaseResults).toEqual(uppercaseResults);
    expect(lowercaseResults.map((book) => book.title)).toEqual(["Project Hail Mary"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
