import template from './sidebar.art'
import styles from './sidebar.scss'

import IconButton from '@/components/IconButton/IconButton'

import menuSvgIcon from '@/assets/menu.svg'
import title from './title'

export default class Sidebar {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    init() {

        this.templateHtml = this.template({
            styles: this.styles,
            title:title,
            icon:new IconButton({
                type:'rotate',
                icon:menuSvgIcon,
                className:styles.menuButton
            }).html()
        })
    }

    html(){
        return this.templateHtml
    }
}