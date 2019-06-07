import template from './import.art'
import styles from './import.scss'

import IconButton from '@/components/IconButton/IconButton'

import { Components } from '@/core/super/components'

import upSvgIcon from '@/assets/up.svg'

export default class Import extends Components{
    constructor() {
        super()

        this.template = template
        this.styles = styles

        this.init()
    }

    data() {
        return {
            icon: new IconButton({
                icon: upSvgIcon,
                className: styles.cancelButton
            }).html()
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            icon: data.icon
        })

        super.mounted(()=>{
            document.querySelector('.'+styles.cancelButton).addEventListener('click',function(){
                document.querySelector('.'+styles.component).style.bottom = '-100%'
            })
        })
    }

    html() {
        return this.templateHtml
    }
}