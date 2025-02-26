import { Scroll } from "../assets/mySVG"
import SearchMenu from "../SearchMenu/SearchMenu"
import ListMysteryCards from "../ListMysteryCards/ListMysteryCards"
import WindowMemo from "../WindowMemo/WindowMemo"
import { observer } from "mobx-react"
import StorageCollection from "../Storage/StorageCollection"

const SectionMain = () => {
  const db = StorageCollection.copyCollection.slice(0, StorageCollection.pageLong)
  const getPage = () => { StorageCollection.addPageLong }

  return (<>
    <SearchMenu />

    <ListMysteryCards collection={db} />

    {StorageCollection.copyCollection.length <= 12 || StorageCollection.copyCollection.length === db.length ? null :
      <button className='btn btn__main' onClick={() => { getPage() }} >Развернуть еще <Scroll className='svg' /></button>}

    <WindowMemo />
  </>)
}

export default observer(SectionMain)
