import template from './sidebar.art'
import styles from './sidebar.scss'

import IconButton from '@/components/IconButton/IconButton'

import { Components } from '@/core/super/components'

import menuSvgIcon from '@/assets/menu.svg'
import title from './title'

import settingStyles from '@/pages/setting/setting.scss'
import historyStyles from '@/pages/history/history.scss'
import exportStyles from '@/pages/export/export.scss'
import importStyles from '@/pages/import/import.scss'

export default class Sidebar extends Components{
    constructor() {
        super()

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

        super.mounted(()=>{

            document.querySelector(`.${styles.component} .plan`).addEventListener('click',()=>{
                document.querySelector('.'+settingStyles.component).style.top = '0'
            })

            document.querySelector(`.${styles.component} .history`).addEventListener('click',()=>{
                document.querySelector('.'+historyStyles.component).style.left = '0'
            })

            document.querySelector(`.${styles.component} .export`).addEventListener('click',()=>{
                document.querySelector('.'+exportStyles.component).style.bottom = '0'
            })

            document.querySelector(`.${styles.component} .import`).addEventListener('click',()=>{
                document.querySelector('.'+importStyles.component).style.bottom = '0'
            })
        })
    }

    html(){
        return this.templateHtml
    }
}