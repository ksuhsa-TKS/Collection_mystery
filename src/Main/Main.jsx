import SectionMain from "../SectionMain/SectionMain";
import OpenCard from '../OpenCard/OpenCard'
import DeletionWarning from "../DeletionWarning/DeletionWarning"
import CreatingCard from "../CreatingCard/CreatingCard"
import './Main.css'
import { observer } from "mobx-react"
import { Route, Routes } from 'react-router'
import StorageCollection from "../Storage/StorageCollection"
import StorageModal from "../Storage/StorageModal"

const Main = () => {
  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<SectionMain />} />
        <Route path='/:id' element={<OpenCard />} />
      </Routes>

      {StorageCollection.windowWarning === 'open' && <DeletionWarning />}

      {StorageModal.windowPosition === 'open' && <CreatingCard />}
    </main>
  )
}

export default observer(Main)
