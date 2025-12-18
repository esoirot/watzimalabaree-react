export type ItemType = [];

export type Item = {
  id: number;
  name: string;
  price: number;
  has_barcode: boolean;
  barcode_value: string;
};

export const newItemDefaultValue: Item = {
  id: 0,
  name: '',
  price: 0.0,
  has_barcode: false,
  barcode_value: ''
};

export type Book = Item & {
  published_year: number | undefined;
  limited_edition: boolean;
  collector: boolean;
  category: BookCategory | undefined;
  genre: BookGenre | undefined;
  thematic: BookThematic | undefined;
  language: string;
  publisher: string;
  reader_type: BookReaderType | undefined;
  status: BookStatus | undefined;
  condition: BookCondition | undefined;
};

export type BookCategory = "Manga" | "BD" | "Comics" | "Livre" | "Autre";
export type BookGenre = "Roman" | "Nouvelle" | "Conte" | "Biographie" | "Théatre" | "Poésie" | "Epistolaire" | "Essai" | "Dictionnaire" | "Magazine";
export type BookThematic = "Science Fiction" | "Horreur" | "Autre";
export type BookReaderType = "Enfant" | "Ado" | "Adulte" | "Tout age";
export type BookStatus = "Présent" | "Prété" | "Emprunté" | "Perdu";
export type BookCondition = "Neuf" | "Usagé" | "Abimé" | "Très abimé" | "Délabré";

export const newBookDefaultValue: Book = {
  id: 0,
  name: '',
  price: 0.0,
  has_barcode: false,
  barcode_value: '',
  published_year: undefined,
  limited_edition: false,
  collector: false,
  category: undefined,
  genre: undefined,
  thematic: undefined,
  language: '',
  publisher: '',
  reader_type: undefined,
  status: undefined,
  condition: undefined
};

export type OtherItem = Item;
export type Boardgame = Item;
