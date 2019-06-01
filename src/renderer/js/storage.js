import util from './util/util'

export default class Storage {

    constructor() {
        this.data = {}
        this.storage = util.storage()
    }

    get(item) {
        let value

        if (this.data.item) {
            value = this.data.item
        } else {
            value = this.storage.get(item)
        }

        return value
    }

    set(item, value) {
        this.data.item = typeof value !== 'string' ? JSON.stringify(value) : value
        this.storage.set(item, this.data.item)
    }
}