import tplTimer from '../template/timer.art'

export default class Template {

    constructor(options) {
        this.container = options.container
        this.options = options
        this.elements = {}

        this._init()
    }

    _init() {

        this.container.innerHTML = tplTimer({
            options: this.options
        })

        let options = {},
            buttons = {}

        this.elements.time = this.container.querySelector('.ayan-time-display')
        options.work = this.container.querySelector('.ayan-control-option-work')
        options.rest = this.container.querySelector('.ayan-control-option-rest')
        buttons.work = this.container.querySelector('.ayan-control-button-work')
        buttons.rest = this.container.querySelector('.ayan-control-button-rest')
        buttons.reset = this.container.querySelector('.ayan-control-button-reset')
        buttons.now = this.container.querySelector('.ayan-control-button-now')

        this.elements.options = options
        this.elements.buttons = buttons
    }

    getItem(name) {
        return this.elements[name]
    }
}