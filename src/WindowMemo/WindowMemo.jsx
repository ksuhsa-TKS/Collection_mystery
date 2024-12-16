import './WindowMemo.css'
import { observer } from 'mobx-react'
import StorageCollection from '../Storage/StorageCollection'

const WindowMemo = () => {
  return (
    <aside className="flex memo">
      {StorageCollection.name !== '' && <p className="descr memo__descr">Название</p>}

      {StorageCollection.genreList.length > 0 && <p className="descr memo__descr">Жанр</p>}

      {StorageCollection.status !== 'Статус игры' && <p className="descr memo__descr">Статус игры</p>}

      {StorageCollection.pnp !== 'all' && <p className="descr memo__descr">PNP</p>}

      {StorageCollection.player !== 0 && <p className="descr memo__descr">Игроки</p>}

      {StorageCollection.publisher !== '' && <p className="descr memo__descr">Издатели</p>}

      {StorageCollection.authorList.length > 0 && <p className="descr memo__descr">Авторы</p>}
    </aside>
  )
}

export default observer(WindowMemo)
