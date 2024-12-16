import './SearchBox.css'
import { observer } from 'mobx-react'

const SearchBox = ({
  collection,
  windowCheck,
  windowUpdate,
  windowValue,
  search,
  seacrhElement,
  reset,
  update,
  nameCollection,
  Icon,
  styleWindow = '',
  styleInput = '',
  typeInput = 'checkbox'
}) => {

  const list = () => {
    switch (collection.length > 0) {
      case true:
        return (
          <>
            <ul className='flex search-box__list'>
              {collection.map((value) => (
                <li className='flex search-box__item' key={value}>
                  <label className='search-box__lable'>
                    <input className={`input search-box__input ${styleInput}`} type={typeInput} name={typeInput === 'checkbox' ? value : nameCollection}
                      defaultChecked={
                        Array.isArray(seacrhElement) ? seacrhElement.includes(value.toLowerCase()) :
                          !isNaN(seacrhElement) ? seacrhElement === Number(value[0]) :
                            seacrhElement.toLowerCase() === value.toLowerCase() ? true : false
                      }
                      onClick={(e) => { search(value.toLowerCase(), e.target.checked) }} />
                    <p className='descr search-box__descr'>{value}</p>
                  </label>
                </li>
              ))}
            </ul>

            {update && <button className="btn search-box__btn" onClick={() => { update() }}>Обновить</button>}
            {reset && <button className="btn search-box__btn" onClick={() => { reset() }}>Сбросить</button>}
          </>
        )
      case false:
        return (
          <p className="descr search-box__warning">Пока этот список пуст</p>
        )
    }
  }

  switch (windowCheck) {
    case 'open':
      return (
        <div className={`search-box ${styleWindow}`}>
          <button className='btn flex search-box__btn search-box__btn--main' onClick={() => { windowUpdate(windowValue) }}>
            {Icon && <Icon className='svg search-box__svg' />}
            <p className="descr search-box__descr">{nameCollection}</p>
          </button>

          <div className='flex search-box__wrap search-box__wrap--open'>
            {list()}
          </div>
        </div >
      )
    case 'closed':
      return (
        <div className={`search-box ${styleWindow}`}>
          <button className='btn flex search-box__btn search-box__btn--main' onClick={() => { windowUpdate(windowValue) }}>
            {Icon && <Icon className='svg search-box__svg' />}
            <p className="descr search-box__descr">{nameCollection}</p>
          </button>

          <div className='flex search-box__wrap search-box__wrap--closed'></div>
        </div >
      )
  }
}

export default observer(SearchBox)
