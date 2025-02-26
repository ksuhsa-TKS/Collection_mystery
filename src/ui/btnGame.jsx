import StorageModal from "../Storage/StorageModal"

const btnStatus = (inventory) => {
  switch (inventory.status) {
    case true:
      return (
        <button className="btn" type="button" onClick={() => StorageModal.updateStatusGameInventory(inventory.id, false)} >
          Играли
        </button>
      )
    case false:
      return (
        <button className="btn btn__card" type="button" onClick={() => StorageModal.updateStatusGameInventory(inventory.id, true)} >
          Не играли
        </button>
      )
  }
}

export default btnStatus
