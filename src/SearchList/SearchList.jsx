import { Plus, Publisher, Player, Author } from '../assets/mySVG.js'
import SearchBox from '../SearchBox/SearchBox.jsx'
import './SearchList.css'
import { useState } from 'react'
import { observer } from "mobx-react"
import StoragePartInventory from '../Storage/StoragePartInventory.jsx'
import StorageCollection from '../Storage/StorageCollection.jsx'

const SearchList = () => {
  const [window, setWindow] = useState('closed')

  const searchPublisher = (value, state) => {
    state ? document.querySelectorAll('.publisher__input').forEach((e) => { e.name.toLowerCase() === value.toLowerCase() ? e.checked = true : e.checked = false }) : null
    StorageCollection.addPublisher(value, state)
    StorageCollection.checkFilling('searchPublisher')
    StorageCollection.searchPublisherCollection
  }
  const resetPublisher = () => {
    StorageCollection.resetPublisher
    StorageCollection.checkFilling('searchPublisher')
    document.querySelectorAll('.publisher__input').forEach((e) => { e.checked = false })
  }

  const searchAuthor = (value, state) => {
    StorageCollection.addAuthorList(value, state)
    StorageCollection.checkFilling('searchAuthor')
    StorageCollection.searchAuthorCollection
  }
  const resetAuthor = () => {
    StorageCollection.resetAuthorList
    StorageCollection.checkFilling('searchAuthor')
    document.querySelectorAll('.author__input').forEach((e) => { e.checked = false })
  }

  const searchPlayer = (value, state) => {
    state ? document.querySelectorAll('.player__input').forEach((e) => { e.name === value ? e.checked = true : e.checked = false }) : null
    StorageCollection.addPlayer(Number(value[0]), state)
    StorageCollection.checkFilling('sortPlayer')
    StorageCollection.sortPlayerCollection
  }
  const resetPlayer = () => {
    StorageCollection.resetPlayer
    StorageCollection.checkFilling('sortPlayer')
    document.querySelectorAll('.player__input').forEach((e) => { e.checked = false })
  }

  switch (window) {
    case 'open':
      return (<>
        <button className="btn search-list__btn search-list__btn--closed" onClick={() => { setWindow('closed') }}>
          <Plus className='svg search-list__svg' />
        </button>

        <SearchBox collection={StoragePartInventory.playerList}
          windowCheck={StoragePartInventory.windowPlayer}
          windowUpdate={StoragePartInventory.updateWindow}
          windowValue='player'
          search={searchPlayer}
          seacrhElement={StorageCollection.player}
          reset={resetPlayer}
          nameCollection='Игроки'
          Icon={Player}
          styleWindow='player'
          styleInput='player__input'
        />

        <SearchBox collection={StoragePartInventory.publisherList}
          windowCheck={StoragePartInventory.windowPublisher}
          windowUpdate={StoragePartInventory.updateWindow}
          windowValue='publisher'
          search={searchPublisher}
          seacrhElement={StorageCollection.publisher}
          reset={resetPublisher}
          update={StoragePartInventory.updateAllPublisherList}
          nameCollection='Издатлели'
          Icon={Publisher}
          styleWindow='publisher'
          styleInput='publisher__input'
        />

        <SearchBox collection={StoragePartInventory.authorList}
          windowCheck={StoragePartInventory.windowAuthor}
          windowUpdate={StoragePartInventory.updateWindow}
          windowValue='author'
          search={searchAuthor}
          seacrhElement={StorageCollection.authorList}
          reset={resetAuthor}
          update={StoragePartInventory.updateAllAuthorList}
          nameCollection='Авторы'
          Icon={Author}
          styleWindow='author'
          styleInput='author__input'
        />
      </>)
    case 'closed':
      return (
        <button className="btn search-list__btn search-list__btn--open" onClick={() => { setWindow('open') }}>
          <Plus className='svg search-list__svg' />
        </button>
      )
  }
}

export default observer(SearchList)
