import template from './Button.art'
import styles from './Button.scss'

import { Components } from '@/core/super/components'

export default class Button extends Components{
    constructor(setting = {
        text: 'button',
        type: 'default',
        classList: ''
    }) {
        super()

        this.template = template
        this.styles = styles
        this.setting = setting

        this.clickEvents = []

        this.init()
    }

    init() {
        this.templateHtml = this.template({
            styles: this.styles,
            setting: this.setting
        })

        super.mounted(()=>{
            super.query(styles.component).addEventListener('click',(e)=>{
                for(let index in this.clickEvents){
                    this.clickEvents[index](e)
                }
            })
        })
    }

    click(callback){
        this.clickEvents.push(callback)
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