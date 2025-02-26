import { Logo } from '../assets/mySVG'
import CounterMystery from '../CounterMystery/CounterMystery'
import BtnCreatingCard from '../BtnCreatingCard/BtnCreatingCard'
import './Header.css'
import { observer } from 'mobx-react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className="header">
      <Link to='/' className='flex title header__link' onClick={() => { StorageCollection.requestCollection }}>
        <img className='logo' src={Logo} alt="Магический шар коллекции тайн" />
        Коллекция тайн
      </Link>

      <CounterMystery />

      <BtnCreatingCard />
    </header>
  )
}

export default observer(Header)
