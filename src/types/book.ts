import { newItemDefaultValue, type Item } from "./item";

export const BOOK_CATEGORIES = ["Manga", "BD", "Comics", "Livre", "Autre"] as const;
export const BOOK_GENRES = ["Roman", "Nouvelle", "Conte", "Biographie", "Théatre", "Poésie", "Epistolaire", "Essai", "Dictionnaire", "Magazine"] as const;
export const BOOK_THEMATICS = ["Science Fiction", "Horreur", "Autre"] as const;
export const BOOK_READER_TYPES = ["Enfant", "Ado", "Adulte", "Tout age"] as const;
export const BOOK_STATUSES = ["Présent", "Prété", "Emprunté", "Perdu"] as const;
export const BOOK_CONDITIONS = ["Neuf", "Usagé", "Abimé", "Très abimé", "Délabré"] as const;

export type BookCategory = typeof BOOK_CATEGORIES[number];
export type BookGenre = typeof BOOK_GENRES[number];
export type BookThematic = typeof BOOK_THEMATICS[number];
export type BookReaderType = typeof BOOK_READER_TYPES[number];
export type BookStatus = typeof BOOK_STATUSES[number];
export type BookCondition = typeof BOOK_CONDITIONS[number];

export type Book = Item & {
  published_year: number | undefined;
  limited_edition: boolean;
  collector_edition: boolean;
  category: BookCategory | undefined;
  genre: BookGenre | undefined;
  thematic: BookThematic | undefined;
  language: string;
  publisher: string;
  reader_type: BookReaderType | undefined;
  status: BookStatus | undefined;
  condition: BookCondition | undefined;
};
export const newBookDefaultValue: Book = {
  ...newItemDefaultValue,  
  published_year: undefined,
  limited_edition: false,
  collector_edition: false,
  category: undefined,
  genre: undefined,
  thematic: undefined,
  language: '',
  publisher: '',
  reader_type: undefined,
  status: undefined,
  condition: undefined
};