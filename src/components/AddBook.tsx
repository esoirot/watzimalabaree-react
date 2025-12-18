import { useReducer, useState } from "react"
import { newBookDefaultValue, type Item } from "../types";

// export type Item = {
//   id: number;
//   name: string;
//   price: number;
//   has_barcode: boolean;
//   barcode_value: string;
// }

// export type Book = Item & {
//   published_year: number | undefined;
//   limited_edition: boolean;
//   collector: boolean;
//   category: BookCategory | undefined;
//   genre: BookGenre | undefined;
//   thematic: BookThematic | undefined;
//   language: string;
//   publisher: string;
//   reader_type: BookReaderType | undefined;
//   status: BookStatus | undefined;
//   condition: BookCondition | undefined;
// };

// Book => newBookDefaultValue

const apiUrl = 'http://localhost:8000/malabaree/items/'

type ItemAction =
  | { type: 'change_name'; nextName: string }
  | { type: 'change_price'; nextPrice: number }
  | { type: 'change_has_barcode' }
  | { type: 'change_barcode_value'; nextBarcodeValue: string }

function reducer(state: Item, action: ItemAction) {
  switch(action.type) {
    case 'change_name': {
      return {
        ...state,
        name: action.nextName
      }
    }
    case 'change_price': {
      return {
        ...state,
        price: action.nextPrice
      }
    }
    case 'change_has_barcode':
      return {
        ...state,
        has_barcode: !state.has_barcode
      }
    case 'change_barcode_value':
      return {
        ...state,
        barcode_value: action.nextBarcodeValue
      }
    default: {
      throw Error(`Unknown action`)
    }
  }
}

export default function AddBook() {
  const [loading, setLoading] = useState<boolean>(false)
  const [newBook, dispatchNewBook] = useReducer(reducer, newBookDefaultValue)

  const handleNewBookNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_name',
      nextName: e.target.value
    })
  }

  const handleNewBookPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_price',
      nextPrice: Number.parseFloat(e.target.value)
    })
  }

  const handleNewBookHasBarcodeChange = () => {
    dispatchNewBook({ type: 'change_has_barcode' })
  }

  const handleNewBookBarcodeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_barcode_value',
      nextBarcodeValue: e.target.value
    })
  }

  const AddBookInLibrary = async () => {
    try {
      setLoading(true)

      if (!newBook.has_barcode) {
        newBook.barcode_value = ''
      }

      // PREPARE REQUEST
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const body = JSON.stringify(newBook)

      const request = new Request(
        apiUrl,
        {
          method: 'POST',
          body,
          headers
        }
      )

      // DO THE REQUEST
      const response = await fetch(request)
      
      if (!response.ok) {
        throw new Error(`Add item creation failed : ${response.text}`)
      }

      const json = await response.json()

      console.log(`Creation is successful ?\n${json}`)
    } catch (error) {
      console.error(`An error occured : ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const AddItemForm = () => {
    return (
      <div className="p-2 rounded-md">
        <form className="bg-gray-800 p-2 flex flex-col gap-2 rounded-md">
          <div className="bg-blue-500 flex flex-col p-2 rounded-md">
            <label className="text-black p-2">
              Item name
            </label>
            <input 
              type='text'
              id='name'
              name='name'
              required
              className="bg-red-200 text-black flex p-2 rounded-md"
              placeholder='The name of the item'
              onChange={handleNewBookNameChange}
            />
          </div>

          <div className="bg-purple-600 p-2 flex flex-col rounded-md">
            <label className="text-black p-2">Item Price</label>
            <input 
              type='number'
              id='price'
              name='price'
              className="bg-gray-200 text-black p-2 rounded-md"
              placeholder='0.00'
              onChange={handleNewBookPriceChange}
            />
          </div>

          <div className="flex flex-row bg-red-500 p-2 rounded-md items-center">
            <label
              className="text-black p-2"
              htmlFor='hasBarcode'
            >
              Item has barcode ?
            </label>
            <input 
              type='checkbox'
              id='hasBarcode'
              name='hasBarcode'
              required
              className="size-4"
              onChange={handleNewBookHasBarcodeChange}
            />
          </div>

          {newBook.has_barcode && <div className="flex flex-row bg-teal-500 p-2 rounded-md">
            <label className="text-black p-2">
              Barcode Value<br />
              (Read the numbers under the barcode)
            </label>
            <input 
              type='text'
              id='barcodeValue'
              name='barcode'
              required
              className="p-2 bg-gray-200 text-black"
              placeholder='4573102606990'
              onChange={handleNewBookBarcodeValueChange}
            />
          </div>}

          <button
            className="p-2"
            onClick={AddBookInLibrary}
          >
            Add Book in Malabaree
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <p>Loading ...</p>
  
  return (
    <>
      <h1>
        Add a book in Malabaree 
      </h1>

      <AddItemForm />
    </>
  )
}
