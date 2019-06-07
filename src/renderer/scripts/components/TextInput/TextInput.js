import template from './TextInput.art'
import styles from './TextInput.scss'

export default class TextInput {
    constructor(setting = {
        value: '',
        placeholder: '',
        className: ''
    }) {
        this.template = template
        this.styles = styles
        this.setting = setting

        this.init()
    }

    init() {
        this.templateHtml = this.template({
            styles: this.styles,
            setting: this.setting
        })
    }

    html() {
        return this.templateHtml
    }

}