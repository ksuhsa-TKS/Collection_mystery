import { action, computed, makeObservable, observable, runInAction, values } from 'mobx'
import StorageCollection from './StorageCollection.jsx'

class StorageModal {
  windowPosition = 'closed'
  inventory = ''
  author = ''
  publisher = ''
  descr = ''
  ratingGameplay = '0'
  ratingVisually = '0'
  ratingImpression = '0'
  statusGame = false
  base = true
  pnp = false
  statusWindow = 'create' | 'edit'

  constructor() {
    makeObservable(this, {
      windowPosition: observable,
      inventory: observable,
      author: observable,
      publisher: observable,
      descr: observable,
      ratingGameplay: observable,
      ratingVisually: observable,
      ratingImpression: observable,
      statusGame: observable,
      statusWindow: observable,
      base: observable,
      pnp: observable,

      addPosition: action.bound,
      getInventory: action.bound,
      addAuthor: action.bound,
      addPublisher: action.bound,
      addDescr: action.bound,
      addRating: action.bound,
      addStatusGame: action.bound,
      addBase: action.bound,
      addPnp: action.bound,
      addInventory: action.bound,
      updateInventory: action.bound,
      updateStatusGameInventory: action.bound,
    })
  }

  addPosition = (status) => {
    this.statusWindow = status
    this.windowPosition === 'closed' ? this.windowPosition = 'open' : this.windowPosition = 'closed'

    this.author = ''
    this.publisher = ''
    this.descr = ''
    this.ratingGameplay = '0'
    this.ratingVisually = '0'
    this.ratingImpression = '0'
    this.statusGame = false
    this.base = true
    this.pnp = false
  }

  getInventory = (id, status) => { this.inventory = StorageCollection.collection.find(e => e.id === id); this.addPosition(status) }

  addAuthor = (value) => { this.author = value }

  addPublisher = (value) => { this.publisher = value }

  addDescr = (value) => { this.descr = value }

  addRating = (ratingValue) => {
    if (ratingValue.includes('gameplay')) { this.ratingGameplay = ratingValue.split(' ')[1] }
    if (ratingValue.includes('visually')) { this.ratingVisually = ratingValue.split(' ')[1] }
    if (ratingValue.includes('impression')) { this.ratingImpression = ratingValue.split(' ')[1] }
  }

  addStatusGame = (value) => { this.statusGame = value }

  updateBase = (value) => { this.base = value }
  addBase = () => { this.base = !this.base }

  updatePnp = (value) => { this.pnp = value }
  addPnp = () => { this.pnp = !this.pnp }

  addInventory = (data) => {
    const inventory = {
      ...data,
      "id": Date.now(),
      "author": this.author,
      "publisher": this.publisher,
      "descr": this.descr,
      "rating": {
        "gameplay": this.ratingGameplay,
        "visually": this.ratingVisually,
        "impression": this.ratingImpression,
      },
      "allRating": String(Math.round((Number(this.ratingGameplay) + Number(this.ratingVisually) + Number(this.ratingImpression)) / 3)),
      "status": this.statusGame,
      "base": this.base,
      "pnp": this.pnp
    }
    StorageCollection.addCollection(inventory)
    this.addPosition()
  }

  updateInventory = (id, data) => {
    const inventory = {
      ...data,
      "id": id,
      "author": this.author,
      "publisher": this.publisher,
      "descr": this.descr,
      "rating": {
        "gameplay": this.ratingGameplay,
        "visually": this.ratingVisually,
        "impression": this.ratingImpression,
      },
      "allRating": String(Math.round((Number(this.ratingGameplay) + Number(this.ratingVisually) + Number(this.ratingImpression)) / 3)),
      "status": this.statusGame,
      "base": this.base,
      "pnp": this.pnp
    }
    StorageCollection.updateCollection(id, inventory)
    this.addPosition()
  }

  updateStatusGameInventory = (id, status) => { StorageCollection.updateStatusCollection(id, status) }
}

export default new StorageModal()
