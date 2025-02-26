import { Closed, Add } from '../assets/mySVG'
import InputField from '../ui/InputField'
import RatingCrystal from '../RatingCrystal/RatingCrystal'
import './CreatingCard.css'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { observer } from 'mobx-react'
import StorageModal from '../Storage/StorageModal'

const CreatingCard = () => {
  let inventory = {}
  if (StorageModal.statusWindow === 'edit') {
    inventory = StorageModal.inventory
    StorageModal.addSequel(inventory.sequel)
    StorageModal.updateBase(inventory.base)
    StorageModal.updatePnp(inventory.pnp)
    StorageModal.addImg(inventory.img)
    StorageModal.addPublisher(inventory.publisher)
    StorageModal.addAuthor(inventory.author)
    StorageModal.addDescr(inventory.descr)
    StorageModal.addRating(`gameplay ${inventory.rating.gameplay}`)
    StorageModal.addRating(`visually ${inventory.rating.visually}`)
    StorageModal.addRating(`impression ${inventory.rating.impression}`)
    StorageModal.addStatusGame(inventory.status)
  } else { StorageModal.addInventory }

  const [ratingValue, setRatingValue] = useState('0')
  const getRating = (ratingValue) => { setRatingValue(ratingValue) }
  useEffect(() => { StorageModal.addRating(ratingValue) }, [ratingValue])

  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  const onSubmit = useCallback(() => {
    StorageModal.statusWindow === 'create' ? StorageModal.addInventory({ ...getValues() })
      : StorageModal.updateInventory(inventory.id, { ...getValues() })
  }, [getValues])

  const ratingBlock = () => {
    switch (StorageModal.statusWindow) {
      case 'create':
        return (
          <div className='flex form__wrap form__wrap--rating' >
            <span className="descr">Рейтинг по котегориям:</span>
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
          </div>
        )
      case 'edit':
        return (
          <div className='flex form__wrap form__wrap--rating' >
            <span className="descr">Рейтинг по котегориям:</span>
            <div className='flex form__wrap'>
              <label className='flex lable form__lable form__lable--rating'>
                Геймплей:
                <input className='input form__input' type="number" name='gameplay' min='0' max='10' defaultValue={inventory.rating.gameplay ?? inventory.rating.gameplay}
                  onChange={num => StorageModal.addRating(`gameplay ${num.target.value}`)} />
              </label>
              <label className='flex lable form__lable form__lable--rating'>
                Визуал:
                <input className='input form__input' type="number" name='visually' min='0' max='10' defaultValue={inventory.rating.visually ?? inventory.rating.visually}
                  onChange={num => StorageModal.addRating(`visually ${num.target.value}`)} />
              </label>
              <label className='flex lable form__lable form__lable--rating'>
                Впечатление:
                <input className='input form__input' type="number" name='impression' min='0' max='10' defaultValue={inventory.rating.impression ?? inventory.rating.impression}
                  onChange={num => StorageModal.addRating(`impression ${num.target.value}`)} />
              </label>
            </div>
          </div>
        )
    }
  }

  return (
    <div className='modal' id='modal'>
      <form className='flex form' onSubmit={handleSubmit(onSubmit)} >

        <button className='btn form__close' type='button' onClick={() => { StorageModal.addPosition() }} ><Closed /></button>

        <div className="flex form__wrap form__wrap--header">
          <InputField valueLable='Название' valueInput={inventory.name ?? inventory.name} placeholder='Unmatched'
            errorValue={register("name", { required: "Безымянная?", maxLength: { value: 70, message: '70 знаков' } })}
            errorElement={errors.name?.message && <span className='form__warning'>{errors.name?.message}</span>} />

          <span className="flex descr">:</span>

          <label className="flex lable form__lable">
            <input className="input form__input" type="text" name='sequel' placeholder='Робин Гуд и Бигфут'
              defaultValue={inventory.sequel ?? inventory.sequel} onChange={(e) => { StorageModal.addSequel(e.target.value) }} />
          </label>
        </div>

        <div className="flex form__wrap">
          <InputField valueLable='Игроки' valueInput={inventory.player ?? inventory.player} placeholder='от 2 / 2-4'
            errorValue={register("player", { required: "Их нет?", maxLength: { value: 6, message: '6 знаков' } })}
            errorElement={errors.player?.message && <span className='form__warning'>{errors.player?.message}</span>} />

          <InputField valueLable='Время игры' valueInput={inventory.time ?? inventory.time} placeholder='15+ / 30-60'
            errorValue={register("time", { required: "Его нет?", maxLength: { value: 10, message: '10 знаков' } })}
            errorElement={errors.time?.message && <span className='form__warning'>{errors.time?.message}</span>} />

          <label className='flex lable form__lable form__lable--cheked'>
            <input className='input form__input form__input--cheked' type="checkbox" name="base"
              defaultChecked={inventory.base === false ? true : false} onClick={() => { StorageModal.addBase() }} />
            <span className='flex descr form__descr'>DOP</span>
          </label>

          <label className='flex lable form__lable form__lable--cheked'>
            <input className='input form__input form__input--cheked' type="checkbox" name="pnp"
              defaultChecked={inventory.pnp === true ? true : false} onClick={() => { StorageModal.addPnp() }} />
            <span className='flex descr form__descr'>PNP</span>
          </label>
        </div>

        <div className="flex form__wrap">
          <InputField valueLable='Жанр' valueInput={inventory.genre ?? inventory.genre} placeholder='РПГ, соло, дуэль'
            errorValue={register("genre", { required: "Может дуэль?", maxLength: { value: 70, message: '70 знаков' } })}
            errorElement={errors.genre?.message && <span className='form__warning'>{errors.genre?.message}</span>} />

          <label className="flex lable form__lable">
            Ссылка на изображение:
            <input className="input form__input" type="text" name='img' placeholder='https://i.pinimg.....'
              defaultValue={inventory.img ?? inventory.img} onChange={(e) => { StorageModal.addImg(e.target.value) }} />
          </label>
        </div>

        <div className="flex form__wrap">
          <label className="flex lable form__lable">
            Издатель:
            <input className="input form__input" type="text" name='publisher' placeholder='Gaga Games'
              defaultValue={inventory.publisher ?? inventory.publisher} onChange={(e) => { StorageModal.addPublisher(e.target.value) }} />
          </label>

          <label className="flex lable form__lable">
            Автор:
            <input className="input form__input" type="text" name='author' placeholder='Бруно Накатало, и тд.'
              defaultValue={inventory.author ?? inventory.author} onChange={(e) => { StorageModal.addAuthor(e.target.value) }} />
          </label>
        </div>

        <label className='flex lable form__lable form__lable--textarea'>
          Комментарий или краткое описание:
          <textarea className='input form__textarea' rows="5" name='descr' placeholder='В общем, дело было так...'
            defaultValue={inventory.descr ?? inventory.descr} onChange={(e) => { StorageModal.addDescr(e.target.value) }}></textarea>
        </label>

        {ratingBlock()}

        {StorageModal.statusWindow === 'create' &&
          <div className='flex form__wrap form__wrap--use'>
            <label className='flex lable form__lable form__lable--use'>
              <input className='input input__radio' type="radio" name="use" id="true"
                onClick={() => { StorageModal.addStatusGame(true) }} />
              <span className='descr radio__descr'>Играли</span>
            </label>

            <label className='flex lable form__lable form__lable--use'>
              <input className='input input__radio' type="radio" name="use" id="false" defaultChecked
                onClick={() => { StorageModal.addStatusGame(false) }} />
              <span className='descr radio__descr'>Не играли</span>
            </label>
          </div>}

        <div className="flex form__wrap">
          <button className='btn flex descr form__btn' type="submit">
            {StorageModal.statusWindow === 'create' ? "Добавить тайну" : "Изменить тайну"}
            < Add className='svg' />
          </button>

          <p className="descr form__memo">
            <span className="descr form__memo--accent">ᘛ⁐̤ᕐᐷ</span> - это обязательное поле для заполнения
          </p>
        </div>
      </form >
    </div >
  )
}

export default observer(CreatingCard)
