import type { FC } from 'react'
import {useState, ChangeEvent} from 'react'
import './SearchBlock.scss'
import {SearchIcon} from '@/components/Icons'

interface SearchBlockProps {
  onSearch: (searchText: string) => void
}

export const SearchBlock: FC<SearchBlockProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('')
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)
    onSearch(value)
  }

  return (
    <div className='search-content content'>
      <div className='card row'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Поиск подарков в Инвентаре'
          value={searchText}
          onChange={handleInputChange}
          className='search-input'
        />
      </div>
    </div>
  )
}


