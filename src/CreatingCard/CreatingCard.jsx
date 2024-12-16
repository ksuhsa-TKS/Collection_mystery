import InputField from '../ui/InputField'
import RatingCrystal from '../RatingCrystal/RatingCrystal'
import Closed from '../assets/closed.svg?react'
import Add from '../assets/add.svg?react'
import './CreatingCard.css'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import StorageModal from '../Storage/StorageModal'

const CreatingCard = () => {
  let inventory = {}
  if (StorageModal.statusWindow === 'edit') {
    inventory = StorageModal.inventory
    StorageModal.addPublisher(inventory.publisher)
    StorageModal.addAuthor(inventory.author)
    StorageModal.addDescr(inventory.descr)
    StorageModal.addRating(`gameplay ${inventory.rating.gameplay}`)
    StorageModal.addRating(`visually ${inventory.rating.visually}`)
    StorageModal.addRating(`impression ${inventory.rating.impression}`)
    StorageModal.addStatusGame(inventory.status)
    StorageModal.updateBase(inventory.base)
    StorageModal.updatePnp(inventory.pnp)

  } else { StorageModal.addInventory }

  const [ratingValue, setRatingValue] = useState('0')
  const getRating = (ratingValue) => { setRatingValue(ratingValue) }
  useEffect(() => { StorageModal.addRating(ratingValue) }, [ratingValue])

  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  const onSubmit = useCallback(() => {
    {
      StorageModal.statusWindow === 'create' ? StorageModal.addInventory({ ...getValues() })
        : StorageModal.updateInventory(inventory.id, { ...getValues() })
    }
  }, [getValues])

  const ratingBlock = () => {
    switch (StorageModal.statusWindow) {
      case 'create':
        return (<>
          <label className='flex descr form__lable form__lable--rating'>
            Геймплей:
            <RatingCrystal nameRating={'gameplay'} number={getRating} onClick={() => { StorageModal.addRating(ratingValue) }} />
          </label>
          <label className='flex descr form__lable form__lable--rating'>
            Визуал:
            <RatingCrystal nameRating={'visually'} number={getRating} onClick={() => { StorageModal.addRating(ratingValue) }} />
          </label>
          <label className='flex descr form__lable form__lable--rating'>
            Впечатление:
            <RatingCrystal nameRating={'impression'} number={getRating} onClick={() => { StorageModal.addRating(ratingValue) }} />
          </label>
        </>)
      case 'edit':
        return (
          <span className='flex form__wrap'>
            <label className='flex lable form__lable form__lable--rating'>
              Геймплей:
              <input className='input input__rating' type="number" name='gameplay' min='0' max='10' defaultValue={inventory.rating.gameplay ?? inventory.rating.gameplay}
                onChange={num => StorageModal.addRating(`gameplay ${num.target.value}`)} />
            </label>
            <label className='flex lable form__lable form__lable--rating'>
              Визуал:
              <input className='input input__rating' type="number" name='visually' min='0' max='10' defaultValue={inventory.rating.visually ?? inventory.rating.visually}
                onChange={num => StorageModal.addRating(`visually ${num.target.value}`)} />
            </label>
            <label className='flex lable form__lable form__lable--rating'>
              Впечатление:
              <input className='input input__rating' type="number" name='impression' min='0' max='10' defaultValue={inventory.rating.impression ?? inventory.rating.impression}
                onChange={num => StorageModal.addRating(`impression ${num.target.value}`)} />
            </label>
          </span>
        )
    }
  }

  return (
    <div className='modal' id='modal'>
      <form className='flex form' onSubmit={handleSubmit(onSubmit)} >

        <button className='btn form__close' type='button' onClick={() => { StorageModal.addPosition() }} ><Closed /></button>

        <span className="flex form__wrap">
          <InputField valueLable='Название' classLable='form__lable--average'
            valueInput={inventory.name ?? inventory.name} errorValue={register("name", { required: "Как ее зовут?", maxLength: { value: 70, message: '70 знаков' } })}
            errorElement={<span className={`${errors.name?.message ? 'form__warning' : 'form__warning--hide'}`}>{errors.name?.message}</span>} />

          <label className='flex lable form__lable form__lable--head'>
            <input className='input input__cheked' type="checkbox" name="base" onClick={() => { StorageModal.addBase() }}
              defaultChecked={inventory.base === false ? true : false} />
            <span className='flex btn descr descr__cheked'>DOP</span>
          </label>

          <label className='flex lable form__lable form__lable--head'>
            <input className='input input__cheked' type="checkbox" name="pnp" onClick={() => { StorageModal.addPnp() }}
              defaultChecked={inventory.pnp === true ? true : false} />
            <span className='flex btn descr descr__cheked'>PNP</span>
          </label>
        </span>

        <span className="flex form__wrap">
          <InputField valueLable='Ссылка на изображение' classLable='form__lable--center'
            valueInput={inventory.img ?? inventory.img} errorValue={register("img", { required: "Прочерк поможет..." })}
            errorElement={<span className={`${errors.img?.message ? 'form__warning' : 'form__warning--hide'}`}>{errors.img?.message}</span>} />

          <label className="flex lable form__lable form__lable--center">
            Издатель:
            <input type="text" className="input" name='publisher' defaultValue={inventory.publisher ?? inventory.publisher} onChange={(e) => { StorageModal.addPublisher(e.target.value) }} />
          </label>

          <label className="flex lable form__lable form__lable--center">
            Автор:
            <input type="text" className="input" name='author' defaultValue={inventory.author ?? inventory.author} onChange={(e) => { StorageModal.addAuthor(e.target.value) }} />
          </label>
        </span>

        <span className='flex form__wrap'>
          <InputField valueLable='Жанр' classLable='form__lable--min'
            valueInput={inventory.genre ?? inventory.genre} errorValue={register("genre", { required: "А во что играем?", maxLength: { value: 70, message: '70 знаков' } })}
            errorElement={<span className={`${errors.genre?.message ? 'form__warning' : 'form__warning--hide'}`}>{errors.genre?.message}</span>} />

          <InputField valueLable='Игроки' classLable='form__lable--min'
            valueInput={inventory.player ?? inventory.player} errorValue={register("player", { required: "Мы одни?", maxLength: { value: 6, message: '6 знаков' } })}
            errorElement={<span className={`${errors.player?.message ? 'form__warning' : 'form__warning--hide'}`}>{errors.player?.message}</span>} />

          <InputField valueLable='Время игры' classLable='form__lable--min'
            valueInput={inventory.time ?? inventory.time} errorValue={register("time", { required: "Его нет?", maxLength: { value: 10, message: '10 знаков' } })}
            errorElement={<span className={`${errors.time?.message ? 'form__warning' : 'form__warning--hide'}`}>{errors.time?.message}</span>} />
        </span>

        <label className='flex lable form__lable'>
          Комментарий:
          <textarea className='input textarea' rows="5" name='descr' defaultValue={inventory.descr ?? inventory.descr} onChange={(e) => { StorageModal.addDescr(e.target.value) }}></textarea>
        </label>

        <div className='flex lable form__lable'>
          Рейтинг по котегориям:
          {ratingBlock()}
        </div>


        {StorageModal.statusWindow === 'create' &&
          <span className='flex form__wrap form__wrap--use'>
            <label className='flex lable form__lable form__lable--use'>
              <input className='input input__radio' type="radio" name="use" id="true" onClick={() => { StorageModal.addStatusGame(true) }} />
              <span className='descr radio__descr'>Играли</span>
            </label>

            <label className='flex lable form__lable form__lable--use'>
              <input className='input input__radio' type="radio" name="use" id="false" defaultChecked onClick={() => { StorageModal.addStatusGame(false) }} />
              <span className='descr radio__descr'>Не играли</span>
            </label>
          </span>}

        <div className="flex form__wrap">
          <button className='btn flex descr form__btn' type="submit">
            {StorageModal.statusWindow === 'create' ? "Добавить тайну" : "Изменить тайну"}
            < Add className='svg' />
          </button>

          <p className="descr form__memo">
            <span className="descr form__memo--accent">ᘛ⁐̤ᕐᐷ</span> - это обязательный элемент для заполнения
          </p>
        </div>
      </form >
    </div >
  )
}

export default observer(CreatingCard)
