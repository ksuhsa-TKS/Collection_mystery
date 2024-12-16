import MysteryCard from "../MysteryCard/MysteryCard"
import "./ListMysteryCards.css"
import { observer } from "mobx-react"

const ListMysteryCards = ({ collection }) => {
  return (
    collection.length > 0 ?
      <ul className="flex cards">
        {collection.map((inventory) => (
          <li key={inventory.id} className="cards__wrap">
            <MysteryCard inventory={inventory} />
          </li>
        ))}
      </ul>
      :
      <p>Ваших тайн тут нет, пришло время их создать...</p>
  )
}

export default observer(ListMysteryCards)
