import { useState, useEffect } from 'react'
import './App.css'
import { type Item } from './types'
import { Link } from 'react-router'

const apiUrl = 'http://localhost:8000/malabaree/items/'

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const itemsFetcher = async () => {
      try {
        setLoading(true)

        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error(`Fetch error : #{response.text}`)
        }

        const json = await response.json()

        setItems(json)
      } catch (error) {
        console.error(`An error occured : ${error}`)
      } finally {
        setLoading(false)
      }
    }

    itemsFetcher()
  }, [])

  const displayOneItem = (item: Item) => {
    return (
      <div id={item.id.toString()}>
        <p>{JSON.stringify(item)}</p>
      </div>
    )
  }

  const displayItems = () => {
    if (items.length === 0) { return <p>Malabaree is empty ...</p>}

    return (
      <div className="">
        {items.map(displayOneItem)}
      </div>
    );
  }

  const AddBookButton = () => <Link to='/add-book'>Add Book</Link>;
  const RemoveBookButton = () => <button>Remove Book</button>;

  const RefreshItemListButton = () => {
    const fetchItemsList = async () => {
      try {
        setLoading(true)

        const response = await fetch('http://locahost:8000')

        if (!response.ok) {
          throw new Error(`Fetch error, ${response.text}`)
        }

        const json = await response.json()

        setItems(json)
      } catch (error) {
        console.error(`An error occured : ${error}`)
      } finally {
        setLoading(false)
      }
    }

    return <button onClick={fetchItemsList}>Refresh Malarabee Items List</button>;
  }

  if (loading) { return <h1>Loading ...</h1> }

  return (
    <div className="">
      <h1>Malabaree content</h1>
      {displayItems()}

      {AddBookButton()}
      {RemoveBookButton()}
      {RefreshItemListButton()}
    </div>
  )
}

export default App;
