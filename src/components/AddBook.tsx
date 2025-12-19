import React, { useReducer, useState } from "react"
import { BOOK_CATEGORIES, BOOK_CONDITIONS, BOOK_GENRES, BOOK_READER_TYPES, BOOK_STATUSES, BOOK_THEMATICS, newBookDefaultValue, type Book, type BookCategory, type BookCondition, type BookGenre, type BookReaderType, type BookStatus, type BookThematic } from "../types";

const apiUrl = 'http://localhost:8000/malabaree/items/'

type BookAction =
  | { type: 'change_name'; nextName: string }
  | { type: 'change_price'; nextPrice: number }
  | { type: 'change_has_barcode' }
  | { type: 'change_barcode_value'; nextBarcodeValue: string }
  | { type: 'change_bookshelf'; nextBookshelf: number }
  | { type: 'change_bookshelf_position'; nextBookshelfPosition: number }
  | { type: 'change_notes'; nextNotes: string }
  | { type: 'change_published_year'; nextPublishedYear: number | undefined }
  | { type: 'change_limited_edition' }
  | { type: 'change_collector_edition' }
  | { type: 'change_category'; nextCategory: BookCategory | undefined }
  | { type: 'change_genre'; nextGenre: BookGenre | undefined }
  | { type: 'change_thematic'; nextThematic: BookThematic | undefined }
  | { type: 'change_language'; nextLanguage: string }
  | { type: 'change_publisher'; nextPublisher: string }
  | { type: 'change_reader_type'; nextReaderType: BookReaderType | undefined }
  | { type: 'change_status'; nextStatus: BookStatus | undefined }
  | { type: 'change_condition'; nextCondition: BookCondition | undefined };

function reducer(state: Book, action: BookAction) {
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
    case 'change_bookshelf':
      return {
        ...state,
        bookshelf: action.nextBookshelf
      }
    case 'change_bookshelf_position':
      return {
        ...state,
        bookshelfPosition: action.nextBookshelfPosition
      }
    case 'change_notes':
      return {
        ...state,
        notes: action.nextNotes
      }
    case 'change_barcode_value':
      return {
        ...state,
        barcode_value: action.nextBarcodeValue
      }
    case 'change_limited_edition':
      return {
        ...state,
        limited_edition: !state.limited_edition
      }
    case 'change_collector_edition':
      return {
        ...state,
        collector_edition: !state.collector_edition
      }
    case 'change_published_year':
      return {
        ...state,
        published_year: action.nextPublishedYear
      }
    case 'change_category':
      return {
        ...state,
        category: action.nextCategory
      }
    case 'change_genre':
      return {
        ...state,
        genre: action.nextGenre
      }
    case 'change_thematic':
      return {
        ...state,
        thematic: action.nextThematic
      }
    case 'change_language':
      return {
        ...state,
        language: action.nextLanguage
      }
    case 'change_publisher':
      return {
        ...state,
        publisher: action.nextPublisher
      }
    case 'change_reader_type':
      return {
        ...state,
        readerType: action.nextReaderType
      }
    case 'change_status':
      return {
        ...state,
        status: action.nextStatus
      }
    case 'change_condition':
      return {
        ...state,
        condition: action.nextCondition
      }
    default: {
      throw Error(`Unknown action`)
    }
  }
}

interface AddBookFromProps {
  newBook: Book;
  dispatchNewBook: React.ActionDispatch<[action: BookAction]>
}

const AddBookForm = ({ newBook, dispatchNewBook }: AddBookFromProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <p>Loading ...</p>

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

  const handleNewBookBookshelfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_bookshelf',
      nextBookshelf: Number(e.target.value)
    })
  }

  const handleNewBookBookshelfPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_bookshelf_position',
      nextBookshelfPosition: Number(e.target.value)
    })
  }

  const handleNewBookNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_notes',
      nextNotes: e.target.value
    })
  }

  const handleNewBookPublishedYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_published_year',
      nextPublishedYear: Number(e.target.value)
    })
  }

  const handleNewBookLimitedEditionChange = () => {
    dispatchNewBook({ type: 'change_limited_edition' })
  }

  const handleNewBookCollectorEditionChange = () => {
    dispatchNewBook({ type: 'change_collector_edition' })
  }

  const handleNewBookCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_category',
      nextCategory: e.target.value as BookCategory
    })
  }

  const handleNewBookGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_genre',
      nextGenre: e.target.value as BookGenre
    })
  }

  const handleNewBookThematicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_thematic',
      nextThematic: e.target.value as BookThematic
    })
  }

  const handleNewBookLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_language',
      nextLanguage: e.target.value
    })
  }

  const handleNewBookPublisherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchNewBook({
      type: 'change_publisher',
      nextPublisher: e.target.value
    })
  }

  const handleNewBookReaderTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_reader_type',
      nextReaderType: e.target.value as BookReaderType
    })
  }

  const handleNewBookStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_status',
      nextStatus: e.target.value as BookStatus
    })
  }

  const handleNewBookConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatchNewBook({
      type: 'change_condition',
      nextCondition: e.target.value as BookCondition
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

  return (
    <div className="p-2 rounded-md">
      <form
        className="bg-muted p-2 flex flex-col gap-2 rounded-md"
        onSubmit={AddBookInLibrary}
      >
        <div className="flex flex-col p-2 rounded-md">
          <label
            className="p-2"
            htmlFor="name"
          >
            Item name
          </label>
          <input 
            type='text'
            id='name'
            name='name'
            required
            className="p-2"
            placeholder='The name of the item'
            value={newBook.name}
            onChange={handleNewBookNameChange}
          />
        </div>

        <div className="p-2 flex flex-col rounded-md">
          <label
            className="p-2"
            htmlFor="price"
          >
            Prix
          </label>
          <input 
            type='number'
            id='price'
            name='price'
            className="p-2"
            placeholder='0.00'
            min='0'
            value={newBook.price}
            onChange={handleNewBookPriceChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='hasBarcode'
          >
            Item has barcode ?
          </label>
          <input 
            type='checkbox'
            id='hasBarcode'
            name='hasBarcode'
            checked={newBook.has_barcode}
            required
            className="size-4"
            onChange={handleNewBookHasBarcodeChange}
          />
        </div>

        {newBook.has_barcode && <div className="flex flex-col p-2 rounded-md">
          <label className="p-2">
            Barcode Value<br />
            (Read the numbers under the barcode)
          </label>
          <br />
          <input 
            type='text'
            id='barcodeValue'
            name='barcode'
            required
            placeholder='4573102606990'
            value={newBook.barcode_value}
            onChange={handleNewBookBarcodeValueChange}
          />
        </div>}

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='bookshelf'
          >
            Sur quel étagère
          </label>
          <input 
            type='number'
            id='bookshelf'
            name='bookshelf'
            min='1'
            value={newBook.bookshelf}
            onChange={handleNewBookBookshelfChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='shelfPosition'
          >
            Position sur l'étagère
          </label>
          <input 
            type='number'
            id='shelfPosition'
            name='shelfPosition'
            min='1'
            value={newBook.shelfPosition}
            onChange={handleNewBookBookshelfPositionChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='notes'
          >
            Notes / Commentaires
          </label>
          <input 
            type='text'
            id='notes'
            name='notes'
            value={newBook.notes}
            onChange={handleNewBookNotesChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='publishedYear'
          >
            Année de publication
          </label>
          <input 
            type='text'
            id='publishedYear'
            name='publishedYear'
            value={newBook.published_year}
            onChange={handleNewBookPublishedYearChange}
          />
        </div>

        <div className="flex">
          <div className="flex flex-row p-2 rounded-md items-center">
            <label
              className="p-2"
              htmlFor='limitedEdition'
            >
              Edition limitée ?
            </label>
            <input 
              type='checkbox'
              id='limitedEdition'
              name='limitedEdition'
              checked={newBook.limited_edition}
              className="size-4"
              onChange={handleNewBookLimitedEditionChange}
            />
          </div>

          <div className="flex flex-row p-2 rounded-md items-center">
            <label
              className="p-2"
              htmlFor='collectorEdition'
            >
              Edition Collector ?
            </label>
            <input 
              type='checkbox'
              id='collectorEdition'
              name='collectorEdition'
              checked={newBook.collector_edition}
              className="size-4"
              onChange={handleNewBookCollectorEditionChange}
            />
          </div>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='category'
          >
            Catégorie du livre
          </label>
          <select
            id="category"
            name="category"
            value={newBook.category ?? ''}
            onChange={handleNewBookCategoryChange}
          >
            <option value=''>-- select category --</option>
            {BOOK_CATEGORIES.map((category: string) => {
              return (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='genre'
          >
            Genre du livre
          </label>
          <select
            id="genre"
            name="genre"
            value={newBook.genre ?? ''}
            onChange={handleNewBookGenreChange}
          >
            <option value=''>-- select genre --</option>
            {BOOK_GENRES.map((genre: string) => {
              return (
                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='thematic'
          >
            Thématique du livre
          </label>

          <select
            id="thematic"
            name="thematic"
            value={newBook.thematic ?? ''}
            onChange={handleNewBookThematicChange}
          >
            <option value=''>-- select thematic --</option>
            {BOOK_THEMATICS.map((thematic: string) => {
              return (
                <option
                  key={thematic}
                  value={thematic}
                >
                  {thematic}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='language'
          >
            Langue du livre
          </label>
          <input 
            type='text'
            id='language'
            name='language'
            value={newBook.language}
            onChange={handleNewBookLanguageChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='publisher'
          >
            Maison d'édition du livre
          </label>
          <input 
            type='text'
            id='publisher'
            name='publisher'
            value={newBook.publisher}
            onChange={handleNewBookPublisherChange}
          />
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='readerType'
          >
            Type de lecteur du livre
          </label>
          <select
            id="readerType"
            name="readerType"
            value={newBook.reader_type ?? ''}
            onChange={handleNewBookReaderTypeChange}
          >
            <option value=''>-- select reader type --</option>
            {BOOK_READER_TYPES.map((readerType: string) => {
              return (
                <option
                  key={readerType}
                  value={readerType}
                >
                  {readerType}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='status'
          >
            Statut du livre
          </label>
          <select
            id='status'
            name="status"
            value={newBook.status ?? ''}
            onChange={handleNewBookStatusChange}
          >
            <option value=''>-- select status --</option>
            {BOOK_STATUSES.map((status: string) => {
              return (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            })}
          </select>
        </div>

        <div className="flex flex-row p-2 rounded-md items-center">
          <label
            className="p-2"
            htmlFor='condition'
          >
            Condition du livre
          </label>
          <select
            id="condition"
            name="condition"
            value={newBook.condition ?? ''}
            onChange={handleNewBookConditionChange}
          >
            <option value=''>-- select condition --</option>
            {BOOK_CONDITIONS.map((condition: string) => {
              return (
                <option
                  key={condition}
                  value={condition}
                >
                  {condition}
                </option>
              )
            })}
          </select>
        </div>

        <button
          type="button"
          className="p-2"
          onClick={AddBookInLibrary}
        >
          Add Book in Malabaree
        </button>
      </form>
    </div>
  );
}

export default function AddBook() {
  const [newBook, dispatchNewBook] = useReducer(reducer, newBookDefaultValue)
  
  return (
    <>
      <h1>
        Add a book in Malabaree 
      </h1>

      <AddBookForm newBook={newBook} dispatchNewBook={dispatchNewBook} />
    </>
  )
}