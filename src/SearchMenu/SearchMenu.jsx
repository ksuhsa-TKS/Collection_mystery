import SearchField from '../SearchFields/SearchField.jsx'
import SearchButton from '../SearchButton/SearchButton.jsx'
import SearchList from '../SearchList/SearchList.jsx'
import './SearchMenu.css'
import { observer } from "mobx-react"

const SearchMenu = () => {
  return (
    <article className='flex search-menu'>
      <SearchField />

      <SearchButton />

      <SearchList />
    </article>
  )
}

export default observer(SearchMenu)
