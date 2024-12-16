import SearchMenu from "../SearchMenu/SearchMenu"
import ListMysteryCards from "../ListMysteryCards/ListMysteryCards"
import WindowMemo from "../WindowMemo/WindowMemo"
import DeletionWarning from "../DeletionWarning/DeletionWarning"
import CreatingCard from "../CreatingCard/CreatingCard"
import Scroll from '../assets/scroll.svg?react'
import './Main.css'
import { observer } from "mobx-react"
import StorageCollection from "../Storage/StorageCollection"
import StorageModal from "../Storage/StorageModal"

const Main = () => {
  const db = StorageCollection.copyCollection.slice(0, StorageCollection.pageLong)
  const getPage = () => { StorageCollection.addPageLong }

  return (
    <main className='main'>
      <SearchMenu />

      <ListMysteryCards collection={db} />

      {StorageCollection.copyCollection.length <= 12 || StorageCollection.copyCollection.length === db.length ? null :
        <button className='btn btn__main' onClick={() => { getPage() }} >Развернуть еще <Scroll className='svg' /></button>}

      <WindowMemo />

      {StorageCollection.windowWarning === 'open' && <DeletionWarning />}

      {StorageModal.windowPosition === 'open' && <CreatingCard />}
    </main>
  )
}

export default observer(Main)
