import template from './IconButton.art'
import styles from './IconButton.scss'

export default class IconButton {
    constructor(setting = {
        type: 'rotate',
        icon: '',
        className: ''
    }) {
        this.template = template
        this.styles = styles
        this.setting = setting

        this.init()
    }

    data() {
        return {
        }
    }

    methods() {
        return {
            rotate: () => {
                return this.styles.rotate
            },
            scale: () => {
                return this.styles.scale
            },
            type: (type) => {
                if (['rotate', 'scale'].includes(type)) {
                    return this.methods()[this.setting.type]
                }
                return
            }
        }
    }

    init() {
        this.templateHtml = this.template({
            styles: this.styles,
            type: this.methods().type(this.setting.type),
            icon: this.setting.icon,
            className: this.setting.className
        })
    }

    html() {
        return this.templateHtml
    }
}