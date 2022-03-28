import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search';
import Pagination from './components/ui/Pagination';

import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)

      setItems(result.data);
      setIsLoading(false);
    }

    fetchItems();
  }, [query]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <Header />
      <Search getQuery={setQuery} placeholder="Search for Characters..." />
      <CharacterGrid isLoading={isLoading} items={currentItems} />
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={items.length} 
        paginate={paginate} />
    </div>
  )
}

export default App;