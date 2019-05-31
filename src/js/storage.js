import util from './util/util'

export default class Storage {

    constructor() {
        this.data = {}
    }

    get(item) {
        let value

        if (this.data.item) {
            value = this.data.item
        } else {
            value = util.storage.get(item)
        }

        if (typeof value === 'string') {
            try {
                return JSON.parse(value)
            } catch (err) {
                return err
            }
        } else {
            return value
        }
    }

    set(item, value) {
        this.data.item = JSON.stringify(value)
        util.storage.set(item, this.data.item)
    }
}