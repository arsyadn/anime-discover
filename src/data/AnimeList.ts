import { DropdownType } from "../types/anime";
import { generateYearOptions } from "../utils/query";

export const arrCategories: string[] = [
  "All Categories",
  "Action",
  "Adventure",
  "Comedy",
  "Demons",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Harem",
  "Historical",
  "Horror",
  "Isekai",
  "Kids",
  "Magic",
  "Mecha",
  "Military",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "School Life",
  "Science Fiction",
  "Seinen",
  "Shoujo",
  "Shounen Ai",
  "Slice of Life",
  "Supernatural",
  "Thriller",
  "Violence",
];

export const arrSortOptions: DropdownType = [
  { label: "Trending", value: "" },
  { label: "Most Popular", value: "-userCount" },
  { label: "Top Rated", value: "-averageRating" },
  { label: "Newest", value: "-startDate" },
];

export const arrYearOptions: DropdownType = generateYearOptions();
