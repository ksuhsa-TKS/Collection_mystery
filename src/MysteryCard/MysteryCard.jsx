import notImg from '../assets/notImg.svg'
import Gameplay from '../assets/gameplay.svg?react'
import Visually from '../assets/visually.svg?react'
import Impression from '../assets/impression.svg?react'
import Time from '../assets/time.svg?react'
import Player from '../assets/player.svg?react'
import Publisher from '../assets/publisher.svg?react'
import Author from '../assets/author.svg?react'
import Edit from '../assets/edit.svg?react'
import Delete from '../assets/delete.svg?react'
import "./MysteryCard.css"
import { observer } from "mobx-react"
import StorageModal from "../Storage/StorageModal"
import StorageCollection from "../Storage/StorageCollection"

const MysteryCard = ({ inventory }) => {
  const btnStatus = () => {
    switch (inventory.status) {
      case true:
        return (
          <button className="btn card__btn" type="button" onClick={() => StorageModal.updateStatusGameInventory(inventory.id, false)} >
            Играли
          </button>
        )
      case false:
        return (
          <button className="btn card__btn card__btn--color" type="button" onClick={() => StorageModal.updateStatusGameInventory(inventory.id, true)} >
            Не играли
          </button>
        )
    }
  }

  return (
    <div className="flex card">
      <span className="card__span">
        <img className="img card__img" src={inventory.img.length < 10 ? notImg : inventory.img} alt={inventory.name} />

        <span className="flex descr card__span card__span--min">
          <span className="flex descr card__icon card__icon--rating">{inventory.allRating}</span>

          <span className="flex card__table">
            <p className="descr flex"><Gameplay className='svg' /> {inventory.rating.gameplay}</p>
            <p className="descr flex"><Visually className='svg' /> {inventory.rating.visually}</p>
            <p className="descr flex"><Impression className='svg' /> {inventory.rating.impression}</p>
          </span>

          {!inventory.base && <span className="flex descr card__icon card__icon--dop">DOP</span>}
          {inventory.pnp && <span className="flex descr card__icon card__icon--pnp">PNP</span>}
        </span>

      </span>

      <div className="flex card__block">

        <p className="title">{inventory.name}</p>
        <p className="descr">{inventory.genre}</p>

        <span className="flex card__wrap card__wrap--descr">
          <span className="flex descr"><Player className='svg card__svg' /> {inventory.player}</span>
          <span className="flex descr"><Time className='svg card__svg' />{inventory.time}</span>
          {inventory.publisher && <span className="flex descr"><Publisher className='svg card__svg' />{inventory.publisher}</span>}
          {inventory.author && <span className="flex descr"><Author className='svg card__svg' />{inventory.author}</span>}
        </span>

        <p className="descr card__descr">{inventory.descr}</p>

        <span className="flex card__wrap card__wrap--btn">
          {btnStatus()}

          <button className="card__btn card__btn--svg" onClick={() => { StorageModal.getInventory(inventory.id, 'edit') }}><Edit className='svg' /></button>

          <button className="card__btn card__btn--svg" onClick={() => {
            StorageCollection.updateValueWindow('deleteInventory')
            StorageCollection.updateWindowWarning(inventory.id)
          }}>
            <Delete className='svg' />
          </button>
        </span>

      </div>
    </div>
  )
}

export default observer(MysteryCard)
