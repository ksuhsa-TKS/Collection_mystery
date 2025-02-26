import { Telegram, Mail } from '../assets/mySVG'
import './Footer.css'
import StorageCollection from '../Storage/StorageCollection'

const Footer = () => {
  return (
    <footer className='footer'>
      <span className="flex footer__warning">
        <p className="title footer__title">Сохранение данных происходит в кэш браузера.</p>

        <button className="btn footer__btn" onClick={() => {
          StorageCollection.updateValueWindow('deleteCollection')
          StorageCollection.updateWindowWarning()
        }}>
          Сжечь весь свиток
        </button>
      </span>

      <div className='flex footer__wrap'>
        <span className="flex footer__wrap footer__wrap--link">
          <p className="descr footer__descr">Создатель:</p>

          <ul className="flex footer__block footer__block--link">
            <li>
              <a className="flex descr footer__descr" href='https://t.me/Ksenia_TKS/' target='_blank'>
                <Telegram className='svg' /> @Ksenia_TKS</a>
            </li>
            <li>
              <a className="flex descr footer__descr" href='mailto:ksuhsa293@gmail.com' target='_blank'>
                <Mail className='svg' /> ksuhsa293@gmail.com</a>
            </li>
          </ul>
        </span>

        <span className="flex footer__wrap footer__wrap--descr">
          <p className="descr footer__descr">
            Общая информация:
          </p>

          <ul className="flex footer__block footer__block--descr">
            <li className='footer__item'>
              <p className="descr footer__descr">
                Ссылка на изображение: скопируйте адрес изображения (меню правой кнопки мыши)
              </p>
            </li>
            <li className='footer__item'>
              <p className="descr footer__descr">
                Сайт создавался для домашнего использования
              </p>
            </li>
            <li className='footer__item'>
              <p className="descr footer__descr">
                Дизайн разработан самостоятельно
              </p>
            </li>
            <li className='footer__item'>
              <p className="descr footer__descr">
                SVG взято с сайта <a className='descr footer__link' href="https://www.svgrepo.com/" target='_blank'>SVG Repo</a>
              </p>
            </li>
            <li className='footer__item'>
              <p className="descr footer__descr">
                Стэк: React.js, Vite.js, MobX
              </p>
            </li>
          </ul>
        </span>
      </div>
    </footer>
  )
}

export default Footer
