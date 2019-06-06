import template from './container.art'
import styles from './container.scss'

import Control from '@/pages/control/control'
import Sidebar from '@/pages/sidebar/sidebar'

import Square from '@/components/Square/Square'


export default class Container {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    data() {
        return {
            control:new Control().html(),
            sidebar:new Sidebar().html(),
            square:new Square().html()
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            control:data.control,
            sidebar:data.sidebar,
            square:data.square
        })
    }

    html(){
        return this.templateHtml
    }
}