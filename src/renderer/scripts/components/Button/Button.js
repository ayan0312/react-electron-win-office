import template from './Button.art'
import styles from './Button.scss'

import { Components } from '@/core/super/components'

export default class Button extends Components {
    constructor(setting = {
        text: 'button',
        type: 'default',
        classList: ''
    }) {
        super()

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

        super.mounted(() => {
            
        })
    }

    html() {
        return this.templateHtml
    }

    data() {
        return {

        }
    }

    method() {
        return {

        }
    }

}