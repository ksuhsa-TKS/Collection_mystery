import { Closed } from '../assets/mySVG'
import './DeletionWarning.css'
import { observer } from "mobx-react"
import StorageCollection from "../Storage/StorageCollection"


const DeletionWarning = () => {
  switch (StorageCollection.valueWarning) {
    case 'deleteInventory':
      return (
        <div className="window">
          <div className="flex window__wrap">
            <button className='btn window__close' type='button' onClick={() => { StorageCollection.updateWindowWarning() }} >
              <Closed />
            </button>

            <p className="descr">Действительно ли вы желаете отчистить эту тайну?</p>
            <span className='flex window__span'>
              <button className="btn"
                onClick={() => { StorageCollection.deleteInventoryCollection }}>Желаю</button>
              <button className="btn"
                onClick={() => { StorageCollection.updateWindowWarning() }}>Не желаю</button>
            </span>
          </div>
        </div>
      )
    case 'deleteCollection':
      return (
        <div className="window">
          <div className="flex window__wrap">
            <button className='btn window__close' type='button' onClick={() => { StorageCollection.updateWindowWarning() }} >
              <Closed />
            </button>

            <p className="descr">Действительно ли вы желаете сжечь весь этот свиток?</p>
            <span className='flex window__span'>
              <button className="btn"
                onClick={() => { StorageCollection.deleteCollection }}>Желаю</button>
              <button className="btn"
                onClick={() => { StorageCollection.updateWindowWarning() }}>Не желаю</button>
            </span>
          </div>
        </div>
      )
  }
}

export default observer(DeletionWarning)
