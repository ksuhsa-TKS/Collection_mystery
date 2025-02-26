import { action, makeAutoObservable, makeObservable, observable } from 'mobx'
import StorageCollection from './StorageCollection.jsx'
import { useTextConverter } from '../hooks/useTextConverter.js'

class StorageModal {
  windowPosition = 'closed'
  inventory = ''
  sequel = ''
  base = true
  pnp = false
  img = ''
  publisher = ''
  author = ''
  descr = ''
  ratingGameplay = '0'
  ratingVisually = '0'
  ratingImpression = '0'
  statusGame = false
  statusWindow = 'create' | 'edit'

  constructor() { makeAutoObservable(this) }

  addPosition = (status) => {
    this.statusWindow = status
    this.windowPosition === 'closed' ? this.windowPosition = 'open' : this.windowPosition = 'closed'

    this.sequel = ''
    this.base = true
    this.pnp = false
    this.img = ''
    this.author = ''
    this.publisher = ''
    this.descr = ''
    this.ratingGameplay = '0'
    this.ratingVisually = '0'
    this.ratingImpression = '0'
    this.statusGame = false
  }

  getInventory = (id, status) => {
    this.inventory = StorageCollection.collection.find(e => e.id === id)
    this.addPosition(status)
  }

  addSequel = (value) => { this.sequel = value }

  updateBase = (value) => { this.base = value }
  addBase = () => { this.base = !this.base }

  updatePnp = (value) => { this.pnp = value }
  addPnp = () => { this.pnp = !this.pnp }

  addImg = (value) => { this.img = value }

  addPublisher = (value) => { this.publisher = value }

  addAuthor = (value) => { this.author = value }

  addDescr = (value) => { this.descr = value }

  addRating = (ratingValue) => {
    if (ratingValue.includes('gameplay')) { this.ratingGameplay = ratingValue.split(' ')[1] }
    if (ratingValue.includes('visually')) { this.ratingVisually = ratingValue.split(' ')[1] }
    if (ratingValue.includes('impression')) { this.ratingImpression = ratingValue.split(' ')[1] }
  }

  addStatusGame = (value) => { this.statusGame = value }

  addInventory = ({ name, player, time, genre }) => {
    const inventory = {
      "id": Date.now(),
      "name": name,
      "sequel": this.sequel,
      "player": player,
      "time": time,
      "base": this.base,
      "pnp": this.pnp,
      "genre": useTextConverter(genre),
      "img": this.img,
      "publisher": useTextConverter(this.publisher, 'name'),
      "author": useTextConverter(this.author, 'name'),
      "descr": this.descr,
      "rating": {
        "gameplay": this.ratingGameplay,
        "visually": this.ratingVisually,
        "impression": this.ratingImpression,
      },
      "allRating": String(Math.round((Number(this.ratingGameplay) + Number(this.ratingVisually) + Number(this.ratingImpression)) / 3)),
      "status": this.statusGame,
    }
    StorageCollection.addCollection(inventory)
    this.addPosition()
  }

  updateInventory = (id, { name, player, time, genre }) => {
    console.log(this.author)
    const inventory = {
      "id": id,
      "name": name,
      "sequel": this.sequel,
      "player": player,
      "time": time,
      "base": this.base,
      "pnp": this.pnp,
      "genre": useTextConverter(genre),
      "img": this.img,
      "publisher": useTextConverter(this.publisher, 'name'),
      "author": useTextConverter(this.author, 'name'),
      "descr": this.descr,
      "rating": {
        "gameplay": this.ratingGameplay,
        "visually": this.ratingVisually,
        "impression": this.ratingImpression,
      },
      "allRating": String(Math.round((Number(this.ratingGameplay) + Number(this.ratingVisually) + Number(this.ratingImpression)) / 3)),
      "status": this.statusGame,
    }
    StorageCollection.updateCollection(id, inventory)
    this.addPosition()
  }

  updateStatusGameInventory = (id, status) => { StorageCollection.updateStatusCollection(id, status) }
}

export default new StorageModal()
