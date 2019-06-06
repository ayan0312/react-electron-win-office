import template from './container.art'
import styles from './container.scss'

import Control from '@/pages/control/control'

export default class Container {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    data() {
        return {
        }
    }

    init() {

        this.templateHtml = this.template({
            styles: this.styles,
            control:new Control().html()
        })
    }

    html(){
        return this.templateHtml
    }
}