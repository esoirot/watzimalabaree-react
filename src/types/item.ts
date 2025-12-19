export type Item = {
  id: number;
  name: string;
  price: number;
  has_barcode: boolean;
  barcode_value: string;
  bookshelf: number;
  shelfPosition: number;
  notes: string;
};

export const newItemDefaultValue: Item = {
  id: 0,
  name: '',
  price: 0.0,
  has_barcode: false,
  barcode_value: '',
  bookshelf: 0,
  shelfPosition: 0,
  notes: ''
};

export type OtherItem = Item;
export type Boardgame = Item;
