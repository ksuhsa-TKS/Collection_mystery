import { Gameplay, Visually, Impression, Time, Player, Publisher, Author, Edit, Delete } from '../assets/mySVG'
import ImageCard from '../ui/imageCard'
import btnStatus from '../ui/btnGame'
import "./MysteryCard.css"
import { observer } from "mobx-react"
import { Link } from 'react-router'
import StorageModal from "../Storage/StorageModal"
import StorageCollection from "../Storage/StorageCollection"

const MysteryCard = ({ inventory }) => {
  return (
    <div className="flex card">
      <span className="card__span">
        <Link to={`/${inventory.id}`} className='card__link'>
          <ImageCard classImg='card__img' inventory={inventory} />
        </Link>

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
        <Link to={`/${inventory.id}`} className="title card__title">
          {inventory.name}
          {inventory.sequel && `: ${inventory.sequel}`}
        </Link>
        <p className="descr">{inventory.genre}</p>

        <span className="flex card__wrap card__wrap--descr">
          <span className="flex descr"><Player className='svg card__svg' /> {inventory.player}</span>
          <span className="flex descr"><Time className='svg card__svg' />{inventory.time}</span>
          {inventory.publisher && <span className="flex descr"><Publisher className='svg card__svg' />{inventory.publisher}</span>}
          {inventory.author && <span className="flex descr"><Author className='svg card__svg' />{inventory.author}</span>}
        </span>

        <p className="descr card__descr">{inventory.descr}</p>

        <span className="flex card__wrap card__wrap--btn">
          {btnStatus(inventory)}

          <button className="card__btn card__btn--svg" onClick={() => { StorageModal.getInventory(inventory.id, 'edit') }}>
            <Edit className='svg' />
          </button>

          <button className="card__btn card__btn--svg" onClick={() => {
            StorageCollection.updateValueWindow('deleteInventory');
            StorageCollection.updateWindowWarning(inventory.id);
          }}>
            <Delete className='svg' />
          </button>
        </span>
      </div>
    </div>
  )
}

export default observer(MysteryCard)
