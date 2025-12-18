import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AddBook from './components/AddBook.tsx'
import MainLayout from './layout/MainLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="/add-book" element={<AddBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
