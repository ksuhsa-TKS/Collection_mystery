import { action, computed, makeObservable, observable, runInAction } from "mobx"
import StorageCollection from "./StorageCollection"


class StoragePartInventory {
  genreList = []
  publisherList = []
  authorList = []
  playerList = ['1 игрок', '2 игрока', '3 игрока', '4 игрока', '5 игроков', '6 и более']
  sortList = ['А-Я', 'Я-А', '10-0', '0-10']
  windowGenre = 'closed'
  windowPublisher = 'closed'
  windowAuthor = 'closed'
  windowPlayer = 'closed'
  windowSort = 'closed'

  constructor() {
    makeObservable(this, {
      genreList: observable,
      publisherList: observable,
      authorList: observable,
      windowGenre: observable,
      windowPublisher: observable,
      windowAuthor: observable,
      windowPlayer: observable,
      windowSort: observable,

      requestGenreList: computed,
      requestPublisherList: computed,
      requestAuthorList: computed,
      saveGenreList: computed,
      savePublisherList: computed,
      saveAuthorList: computed,

      updateWindow: action.bound,
      updateAllGenreList: action.bound,
      updateGenreList: action.bound,
      updateAllPublisherList: action.bound,
      updatePublisherList: action.bound,
      updateAllAuthorList: action.bound,
      updateAuthorList: action.bound,
    })
  }

  updateWindow = (window) => {
    if (window === 'genre') { return this.windowGenre = this.windowGenre === 'open' ? 'closed' : 'open' }
    if (window === 'publisher') { return this.windowPublisher = this.windowPublisher === 'open' ? 'closed' : 'open' }
    if (window === 'author') { return this.windowAuthor = this.windowAuthor === 'open' ? 'closed' : 'open' }
    if (window === 'player') { return this.windowPlayer = this.windowPlayer === 'open' ? 'closed' : 'open' }
    if (window === 'sort') { return this.windowSort = this.windowSort === 'open' ? 'closed' : 'open' }
  }

  get requestGenreList() {
    let db = localStorage.getItem('genre')
    db = !db ? [] : JSON.parse(db)
    return runInAction(() => { return this.genreList = db })
  }
  get requestPublisherList() {
    let db = localStorage.getItem('publisher')
    db = !db ? [] : JSON.parse(db)
    return runInAction(() => { return this.publisherList = db })
  }
  get requestAuthorList() {
    let db = localStorage.getItem('author')
    db = !db ? [] : JSON.parse(db)
    return runInAction(() => { return this.authorList = db })
  }

  get saveGenreList() { localStorage.setItem('genre', JSON.stringify(this.genreList)) }
  get savePublisherList() { localStorage.setItem('publisher', JSON.stringify(this.publisherList)) }
  get saveAuthorList() { localStorage.setItem('author', JSON.stringify(this.authorList)) }

  updateAllGenreList = () => {
    let copy = []

    StorageCollection.collection.map((el) => {
      el.genre.split(',').map((res) => {
        if (res.trim().length <= 3) {
          copy.push(res.toUpperCase().trim())
        } else {
          const start = res.trim().slice(0, 1).toUpperCase()
          const end = res.trim().slice(1).toLowerCase()
          copy.push(start + end)
        }
      })
    })

    this.genreList = [...new Set(copy)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.saveGenreList
  }

  updateGenreList = (inventory) => {
    inventory.genre.split(',').map((el) => {
      if (el.trim().length <= 3) {
        this.genreList.push(el.toUpperCase().trim())
      } else {
        const start = el.trim().slice(0, 1).toUpperCase()
        const end = el.trim().slice(1).toLowerCase()
        this.genreList.push(start + end)
      }
    })

    this.genreList = [...new Set(this.genreList)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.saveGenreList
  }

  updateAllPublisherList = () => {
    let copy = []

    StorageCollection.collection.map((el) => {
      if (el.publisher) {
        copy.push(el.publisher.split(' ').map((e) => {
          const start = e.trim().slice(0, 1).toUpperCase()
          const end = e.trim().slice(1).toLowerCase()
          return start + end
        }).join(' '))
      }
    })

    this.publisherList = [...new Set(copy)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.savePublisherList
  }

  updatePublisherList = (inventory) => {
    if (inventory.publisher) {
      this.publisherList.push(inventory.publisher.split(' ').map((e) => {
        const start = e.trim().slice(0, 1).toUpperCase()
        const end = e.trim().slice(1).toLowerCase()
        return start + end
      }).join(' '))
    }

    this.publisherList = [...new Set(this.publisherList)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.savePublisherList
  }

  updateAllAuthorList = () => {
    let copy = []

    StorageCollection.collection.map((el) => {
      if (el.author) {
        el.author.split(',').map((res) => {
          copy.push(res.trim().split(' ').map((e) => {
            const start = e.trim().slice(0, 1).toUpperCase()
            const end = e.trim().slice(1).toLowerCase()
            return start + end
          }).join(' '))
        })
      }
    })

    this.authorList = [...new Set(copy)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.saveAuthorList
  }

  updateAuthorList = (inventory) => {
    if (inventory.author) {
      inventory.author.split(',').map((res) => {
        this.authorList.push(res.trim().split(' ').map((e) => {
          const start = e.trim().slice(0, 1).toUpperCase()
          const end = e.trim().slice(1).toLowerCase()
          return start + end
        }).join(' '))
      })
    }

    this.authorList = [...new Set(this.authorList)].sort((a, b) => { if (a > b) { return 1 } else if (a < b) { return -1 } else { return 0 } })
    this.saveAuthorList
  }

}

export default new StoragePartInventory()
