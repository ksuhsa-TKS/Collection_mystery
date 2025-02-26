import { Create } from "../assets/mySVG";
import StorageModal from "../Storage/StorageModal";
import "./BtnCreatingCard.css"
import { observer } from "mobx-react";

const BtnCreatingCard = () => {
  return (
    <button className="btn flex create__btn" type="button" onClick={() => { StorageModal.addPosition('create') }} >
      Создать тайну <Create className="svg" />
    </button>
  )
}

export default observer(BtnCreatingCard)
