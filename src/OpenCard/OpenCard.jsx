import { Edit, Delete } from '../assets/mySVG'
import ImageCard from '../ui/imageCard'
import btnStatus from '../ui/btnGame'
import './OpenCard.css'
import { Link, useParams } from 'react-router'
import { observer } from 'mobx-react'
import StorageCollection from '../Storage/StorageCollection'
import StorageModal from '../Storage/StorageModal'

const OpenCard = () => {
  const { id } = useParams()
  const inventory = StorageCollection.collection.find(el => el.id === Number(id))

  const listGameSeries = StorageCollection.collection.filter(el =>
    el.name.includes(inventory.name) && el.sequel !== inventory.sequel
  )

  return (<>
    <div className="flex game">
      <span className="game__img"><ImageCard inventory={inventory} /></span>

      <div className="flex game__block">
        <span className='flex game__wrap game__wrap--title'>
          <p className="title">
            {inventory.name}
            {inventory.sequel && `: ${inventory.sequel}`}
          </p>

          <span className='flex'>
            {!inventory.base && <span className="flex descr game__icon">DOP</span>}
            {inventory.pnp && <span className="flex descr game__icon">PNP</span>}
          </span>
        </span>

        <span className="flex game__wrap">
          <p className="descr">Жанр: {inventory.genre}</p>

          <span className="flex descr game__wrap--min">
            <span className="flex descr">Рейтинг:</span>

            <p className="descr flex">Геймплей {inventory.rating.gameplay}</p> |
            <p className="descr flex">Визуал {inventory.rating.visually}</p> |
            <p className="descr flex">Впечатление {inventory.rating.impression}</p>
          </span>

          <p className="flex descr">Кол-во игроков: {inventory.player}</p>
          <p className="flex descr">Время партии: {inventory.time} минут</p>
          {inventory.publisher && <p className="flex descr">Издатель: {inventory.publisher}</p>}
          {inventory.author && <p className="flex descr">Автор: {inventory.author}</p>}
        </span>

        {inventory.descr &&
          <span className='flex descr game__wrap'>
            Комментарий или краткое описание:
            <p className="descr game__descr">{inventory.descr}</p>
          </span>}

        <span className="flex game__wrap game__wrap--btn">
          {btnStatus(inventory)}

          <button className="game__btn game__btn--svg" onClick={() => { StorageModal.getInventory(inventory.id, 'edit') }}>
            <Edit className='svg' />
          </button>

          <button className="game__btn game__btn--svg" onClick={() => {
            StorageCollection.updateValueWindow('deleteInventory');
            StorageCollection.updateWindowWarning(inventory.id);
          }}>
            <Delete className='svg' />
          </button>
        </span>
      </div>
    </div>

    {listGameSeries.length !== 0 &&
      <div className="flex game-list">
        <p className="title">Другие игры этой серии</p>

        <ul className='flex game-list__list'>
          {listGameSeries.map(el => (
            <li className="flex game-list__item" key={el.id}>
              <Link to={`/${el.id}`} className='flex game__img game__img--min'>
                <ImageCard inventory={el} />
              </Link>

              <p className='flex descr game-list__name'>
                {el.name}
                {el.sequel && `: ${el.sequel}`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    }
  </>)
}

export default observer(OpenCard)
