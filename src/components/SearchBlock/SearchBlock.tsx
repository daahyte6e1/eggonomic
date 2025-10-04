import type { FC } from 'react'
import {useState, ChangeEvent} from 'react'
import './SearchBlock.scss'
import {SearchIcon} from '@/components/Icons'
import { SearchBlockLoader } from '@/components/SearchBlockLoader'

interface SearchBlockProps {
  onSearch: (searchText: string) => void
  isLoading?: boolean
}

export const SearchBlock: FC<SearchBlockProps> = ({ onSearch, isLoading = false }) => {
  const [searchText, setSearchText] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    onSearch(value)
  }

  return (
    <div className='search-content content'>
      {isLoading && <SearchBlockLoader />}
      <div className='card row'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Searching for gifts in Inventory'
          value={searchText}
          onChange={handleInputChange}
          className='search-input'
        />
      </div>
    </div>
  )
}


