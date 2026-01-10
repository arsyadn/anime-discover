export interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    titles: {
      en?: string;
      ja_jp?: string;
    };
    posterImage: {
      small: string;
      large: string;
    };
    synopsis: string;
    averageRating: string;
    startDate: string;
  };
}

export type DropdownType = { label: string; value: string }[];
