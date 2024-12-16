import { computed, makeObservable, observable, runInAction } from "mobx"
import StorageCollection from "./StorageCollection"


class StorageCounter {
  collection = []
  total = 0
  used = 0
  notUsed = 0
  base = 0
  add = 0
  pnp = 0

  constructor() {
    makeObservable(this, {
      collection: observable,
      total: observable,
      used: observable,
      notUsed: observable,
      base: observable,
      add: observable,
      pnp: observable,

      getData: computed,
    })
  }

  get getData() {
    return runInAction(() => {
      this.collection = StorageCollection.collection

      if (this.collection !== null) {
        this.total = this.collection.length
        this.used = this.collection.filter(el => el.status).length
        this.notUsed = this.collection.filter(el => !el.status).length
        this.base = this.collection.filter(el => el.base).length
        this.add = this.collection.filter(el => !el.base).length
        this.pnp = this.collection.filter(el => el.pnp).length
      }

      return this.collection
    })
  }

}

export default new StorageCounter()
