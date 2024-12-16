import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import StoragePartInventory from './StoragePartInventory'
import StorageCounter from './StorageCounter'
import prod from '../../collection.json'

class StorageCollection {
  collection
  copyCollection
  windowWarning = 'closed'
  valueWarning = ''
  idInventory = null
  name = ''
  genreList = []
  publisher = ''
  authorList = []
  sortNameRating = 'А-Я'
  player = 0
  status = 'Статус игры'
  pnp = 'all'
  long = 12
  pageLong = this.long

  constructor() {
    makeObservable(this, {
      collection: observable,
      copyCollection: observable,
      windowWarning: observable,
      valueWarning: observable,
      idInventory: observable,
      name: observable,
      genreList: observable,
      publisher: observable,
      authorList: observable,
      sortNameRating: observable,
      player: observable,
      status: observable,
      pnp: observable,
      pageLong: observable,

      requestCollection: computed,
      searchNameCollection: computed,
      searchGenreCollection: computed,
      searchPublisherCollection: computed,
      searchAuthorCollection: computed,
      sortSortNameRating: computed,
      sortPlayerCollection: computed,
      sortStatusGameCollection: computed,
      sortPnpCollection: computed,
      resetGenreList: computed,
      resetPublisher: computed,
      resetAuthorList: computed,
      addPageLong: computed,
      deleteInventoryCollection: computed,
      deleteCollection: computed,

      saveCollection: action.bound,
      getCollection: action.bound,
      addCollection: action.bound,
      updateCollection: action.bound,
      updateStatusCollection: action.bound,
      updateWindowWarning: action.bound,
      updateValueWindow: action.bound,
      addName: action.bound,
      addGenreList: action.bound,
      addPublisher: action.bound,
      addAuthorList: action.bound,
      addSortNameRating: action.bound,
      addPlayer: action.bound,
      addStatusGame: action.bound,
      addPnp: action.bound,
      checkFilling: action.bound,
    })
  }

  get requestCollection() {
    let db = localStorage.getItem('collection')

    if (typeof db === 'string' && db.length === 2 || !db) { this.saveCollection(prod); this.requestCollection }
    else {
      db = JSON.parse(db)
      runInAction(() => { this.collection = db; return this.copyCollection = this.collection })

      StoragePartInventory.updateAllGenreList()
      StoragePartInventory.updateAllPublisherList()
      StoragePartInventory.updateAllAuthorList()

      return this.copyCollection
    }
  }

  getCollection = () => { return this.copyCollection === null ? this.copyCollection = this.collection : this.copyCollection = this.copyCollection }

  saveCollection(collection) { localStorage.setItem('collection', JSON.stringify(collection)) }

  addCollection = (inventory) => {
    this.collection.unshift(inventory)
    this.saveCollection(this.collection)

    StoragePartInventory.updateGenreList(inventory)
    StoragePartInventory.updatePublisherList(inventory)
    StoragePartInventory.updateAuthorList(inventory)

    StorageCounter.getData

    this.checkFilling('modal')
  }

  updateCollection = (id, inventory) => {
    const i = this.collection.findIndex(e => e.id === id)
    this.collection.splice(i, 1, inventory)
    this.saveCollection(this.collection)

    StoragePartInventory.updateGenreList(inventory)
    StoragePartInventory.updatePublisherList(inventory)
    StoragePartInventory.updateAuthorList(inventory)

    StorageCounter.getData

    this.checkFilling('modal')
  }

  updateStatusCollection = (id, status) => {
    this.collection.find(e => e.id === id).status = status
    this.saveCollection(this.collection)

    StorageCounter.getData

    this.checkFilling('modal')
  }

  updateWindowWarning = (id) => { this.windowWarning === 'closed' ? (this.windowWarning = 'open', this.idInventory = id) : (this.windowWarning = 'closed', this.idInventory = null) }

  updateValueWindow = (value) => { this.valueWarning = value }

  get deleteCollection() {
    localStorage.removeItem('collection')
    localStorage.removeItem('genre')
    localStorage.removeItem('publisher')
    localStorage.removeItem('author')

    runInAction(() => { this.collection = []; this.copyCollection = [] })
    StoragePartInventory.requestGenreList
    StoragePartInventory.requestPublisherList
    StoragePartInventory.requestAuthorList

    this.updateWindowWarning()

    StorageCounter.getData
  }

  get deleteInventoryCollection() {
    const i = this.collection.findIndex(e => e.id === this.idInventory)
    runInAction(() => { this.collection.splice(i, 1) })
    this.updateWindowWarning()
    this.saveCollection(this.collection)

    StorageCounter.getData

    this.checkFilling('modal')
  }

  addName = (value) => { this.name = value }
  get searchNameCollection() {
    if (this.name !== '') {
      runInAction(() => { this.copyCollection = this.copyCollection.filter(el => el.name.toLowerCase().includes(this.name.toLowerCase())) })
    }
  }

  addGenreList = (value, state) => {
    if (state) { this.genreList.push(value.toLowerCase()) }
    else {
      this.copyCollection = null
      this.getCollection()
      const i = this.genreList.indexOf(value.toLowerCase())
      this.genreList.splice(i, 1)
    }
  }
  get resetGenreList() { runInAction(() => { this.genreList = [] }) }
  get searchGenreCollection() {
    if (this.genreList.length > 0) {
      this.genreList.map((item) => {
        runInAction(() => { this.copyCollection = this.copyCollection.filter(el => el.genre.toLowerCase().includes(item.toLowerCase())) })
      })
    }
  }

  addPublisher = (value, state) => { state ? this.publisher = value.toLowerCase() : this.publisher = '', this.copyCollection = null, this.getCollection() }
  get resetPublisher() { runInAction(() => { this.publisher = '' }) }
  get searchPublisherCollection() {
    if (this.publisher !== '') {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((el) => { if (el.publisher) { return el.publisher.toLowerCase().includes(this.publisher.toLowerCase()) } })
      })
    }
  }

  addAuthorList = (value, state) => {
    if (state) { this.authorList.push(value.toLowerCase()) }
    else {
      this.copyCollection = null
      this.getCollection()
      const i = this.authorList.indexOf(value.toLowerCase())
      this.authorList.splice(i, 1)
    }
  }
  get resetAuthorList() { runInAction(() => { this.authorList = [] }) }
  get searchAuthorCollection() {
    if (this.authorList.length > 0) {
      this.authorList.map((item) => {
        runInAction(() => {
          this.copyCollection = this.copyCollection.filter((el) => { if (el.author) { return el.author.toLowerCase().includes(item.toLowerCase()) } }
          )
        })
      })
    }
  }

  addPlayer = (value, state) => { state ? this.player = Number(value) : this.player = 0, this.copyCollection = null, this.getCollection() }
  get resetPlayer() { runInAction(() => { this.player = 0 }) }
  get sortPlayerCollection() {
    if (this.player === 1) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => { return Number(num.player.split('-')[0]) === 1 || num.player.includes('от 1') })
      })
    }

    if (this.player === 2) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => {
          if (Number(num.player[0]) === 1) { return Number(num.player.split('-')[1]) >= 2 }
          if (num.player.includes('от')) { return Number(num.player.split(' ')[1]) <= 2 }
          else { return Number(num.player.split('-')[0]) === 2 }
        })
      })
    }

    if (this.player === 3) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => {
          if (Number(num.player[0]) < 3) { return Number(num.player.split('-')[1]) >= 3 }
          if (num.player.includes('от')) { return Number(num.player.split(' ')[1]) <= 3 }
          else { return Number(num.player.split('-')[0]) === 3 }
        })
      })
    }

    if (this.player === 4) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => {
          if (Number(num.player[0]) < 4) { return Number(num.player.split('-')[1]) >= 4 }
          if (num.player.includes('от')) { return Number(num.player.split(' ')[1]) <= 4 }
          else { return Number(num.player.split('-')[0]) === 4 }
        })
      })
    }

    if (this.player === 5) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => {
          if (Number(num.player[0]) < 5) { return Number(num.player.split('-')[1]) >= 5 }
          if (num.player.includes('от')) { return Number(num.player.split(' ')[1]) <= 5 }
          else { return Number(num.player.split('-')[0]) >= 5 }
        })
      })
    }

    if (this.player === 6) {
      runInAction(() => {
        this.copyCollection = this.copyCollection.filter((num) => {
          if (Number(num.player[0]) < 6) { return Number(num.player.split('-')[1]) >= 6 }
          if (num.player.includes('от')) { return Number(num.player.split(' ')[1]) <= 6 }
          else { return Number(num.player.split('-')[0]) >= 6 }
        })
      })
    }
  }

  addSortNameRating = (value, state) => { state ? this.sortNameRating = value : this.sortNameRating = 'А-Я', this.copyCollection = null, this.getCollection() }
  get sortSortNameRating() {
    if (this.sortNameRating.toUpperCase() === 'А-Я') {
      runInAction(() => {
        this.copyCollection = this.copyCollection.sort((a, b) => {
          if (a.name > b.name) { return 1 } else if (a.name < b.name) { return -1 } else { return 0 }
        })
      })
    }
    if (this.sortNameRating.toUpperCase() === 'Я-А') {
      runInAction(() => {
        this.copyCollection = this.copyCollection.sort((a, b) => {
          if (a.name > b.name) { return -1 } else if (a.name < b.name) { return 1 } else { return 0 }
        })
      })
    }
    if (this.sortNameRating === '10-0') { runInAction(() => { this.copyCollection = this.copyCollection.sort((a, b) => { return b.allRating - a.allRating }) }) }
    if (this.sortNameRating === '0-10') { runInAction(() => { this.copyCollection = this.copyCollection.sort((a, b) => { return a.allRating - b.allRating }) }) }
  }

  addStatusGame = (value) => { this.status = value }
  get sortStatusGameCollection() {
    if (this.status === 'Играли') { return runInAction(() => { this.copyCollection = this.copyCollection.filter(el => el.status === true) }) }
    if (this.status === 'Не играли') { return runInAction(() => { this.copyCollection = this.copyCollection.filter(el => el.status === false) }) }
  }

  addPnp = (value) => { this.pnp = value }
  get sortPnpCollection() {
    if (this.pnp === 'pnp') { return runInAction(() => { this.copyCollection = this.copyCollection.filter(el => el.pnp === true) }) }
  }

  get addPageLong() { runInAction(() => { this.pageLong += this.long }) }

  checkFilling = (element) => {
    this.copyCollection = null
    this.getCollection()
    element === 'modal' ? null : this.pageLong = this.long

    if (element === 'modal') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }

    if (element === 'searchName') {
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'searchGenre') {
      this.searchNameCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'searchPublisher') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'searchAuthor') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'sortNameRating') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortPlayerCollection
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'sortPlayer') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortStatusGameCollection
      this.sortPnpCollection
    }
    if (element === 'sortStatus') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortPnpCollection
    }
    if (element === 'sortPnp') {
      this.searchNameCollection
      this.searchGenreCollection
      this.searchPublisherCollection
      this.searchAuthorCollection
      this.sortSortNameRating
      this.sortPlayerCollection
      this.sortStatusGameCollection
    }
  }
}

export default new StorageCollection()
