import SearchBox from '../SearchBox/SearchBox.jsx'
import "./SearchField.css"
import { observer } from "mobx-react"
import StorageCollection from "../Storage/StorageCollection.jsx"
import StoragePartInventory from '../Storage/StoragePartInventory.jsx'

const SearchField = () => {
  const search = (value) => {
    StorageCollection.addName(value)
    StorageCollection.checkFilling('searchName')
    StorageCollection.searchNameCollection
  }

  const searchSort = (value, state) => {
    if (StorageCollection.sortNameRating.toLowerCase() === value) { return }
    StorageCollection.addSortNameRating(value, state)
    StorageCollection.checkFilling('sortNameRating')
    StorageCollection.sortSortNameRating
  }

  const searchGenre = (value, state) => {
    StorageCollection.addGenreList(value, state)
    StorageCollection.checkFilling('searchGenre')
    StorageCollection.searchGenreCollection
  }
  const resetGenre = () => {
    StorageCollection.resetGenreList
    StorageCollection.checkFilling('searchGenre')
    document.querySelectorAll('.genres__input').forEach((e) => { e.checked = false })
  }

  return (<>

    <form className="flex search" onSubmit={e => e.preventDefault()} role="search">
      <SearchBox collection={StoragePartInventory.sortList}
        windowCheck={StoragePartInventory.windowSort}
        windowUpdate={StoragePartInventory.updateWindow}
        windowValue='sort'
        search={searchSort}
        seacrhElement={StorageCollection.sortNameRating}
        nameCollection={`${StorageCollection.sortNameRating.toUpperCase()}`}
        styleWindow='sort'
        styleInput='sort__input'
        typeInput='radio'
      />

      <label className="lable search__lable">
        <input className="input search__input" type="text" name="Title" placeholder="Название"
          defaultValue={StorageCollection.name ?? StorageCollection.name} onChange={(e) => { search(e.target.value) }} />
        <span className="descr search__span">Название</span>
      </label>
    </form>

    <SearchBox collection={StoragePartInventory.genreList}
      windowCheck={StoragePartInventory.windowGenre}
      windowUpdate={StoragePartInventory.updateWindow}
      windowValue='genre'
      search={searchGenre}
      seacrhElement={StorageCollection.genreList}
      reset={resetGenre}
      update={StoragePartInventory.updateAllGenreList}
      nameCollection='Жанры'
      styleWindow='genre'
      styleInput='genres__input'
    />
  </>
  )
}

export default observer(SearchField)
