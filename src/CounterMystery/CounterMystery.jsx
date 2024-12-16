import Counter from '../assets/counter.svg?react'
import CounterOpen from '../assets/counterOpen.svg?react'
import './CounterMystery.css'
import { useWidthDesktop } from '../hooks/useWidthDesktop'
import { observer } from 'mobx-react'
import StorageCounter from '../Storage/StorageCounter'
import { useState } from 'react'

const CounterMystery = () => {
  const { screenWidth } = useWidthDesktop()
  const [window, setWindow] = useState('closed')

  const offset = () => {
    switch (window) {
      case 'open':
        return (
          <aside className="flex counter counter-offset">
            <p className="title counter__title" > Полученные тайны: {StorageCounter.total}</p >

            <div className="flex counter__list">
              {StorageCounter.used >= 1 && <p className="descr">Изученны: {StorageCounter.used}</p>}
              {StorageCounter.notUsed >= 1 && <p className="descr">Не тронуты: {StorageCounter.notUsed}</p>}
              {StorageCounter.base >= 1 && <p className="descr">Главные: {StorageCounter.base}</p>}
              {StorageCounter.add >= 1 && <p className="descr">Добавочные: {StorageCounter.add}</p>}
              {StorageCounter.pnp >= 1 && <p className="descr">Произведенные: {StorageCounter.pnp}</p>}
            </div>
          </aside >
        )
      case 'closed':
        return (null)
    }
  }

  return (
    screenWidth > 640 ?
      <aside className="flex counter">
        <p className="title counter__title" > Полученные тайны: {StorageCounter.total}</p >

        <div className="flex counter__list">
          {StorageCounter.used >= 1 && <p className="descr">Изученны: {StorageCounter.used}</p>}
          {StorageCounter.notUsed >= 1 && <p className="descr">Не тронуты: {StorageCounter.notUsed}</p>}
          {StorageCounter.base >= 1 && <p className="descr">Главные: {StorageCounter.base}</p>}
          {StorageCounter.add >= 1 && <p className="descr">Добавочные: {StorageCounter.add}</p>}
          {StorageCounter.pnp >= 1 && <p className="descr">Произведенные: {StorageCounter.pnp}</p>}
        </div>
      </aside >
      :
      <div className="flex">
        <button className="flex btn counter__btn" onClick={() => { window === 'open' ? setWindow('closed') : setWindow('open') }}>
          {window === 'open' ? <CounterOpen className='svg counter__svg' /> : <Counter className='svg counter__svg' />}
          Счетчик
        </button>

        {offset()}
      </div>
  )
}

export default observer(CounterMystery)
