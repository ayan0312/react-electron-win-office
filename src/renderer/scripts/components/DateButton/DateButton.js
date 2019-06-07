import template from './DateButton.art'
import styles from './DateButton.scss'

import SelectDateInput from './SelectDateInput/SelectDateInput'

import { Components } from '@/core/super/components'


export default class DateButton extends Components{
    constructor(setting = {
        data: new Date(),
        className: ''
    }) {
        super()

        this.template = template
        this.styles = styles
        this.setting = setting

        this.init()
    }

    data() {
        return {
            selectDate: ''
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            setting: this.setting,
            selectDate: SelectDateInput.html()
        })

        super.mounted(()=>{
            let date = document.querySelector('.'+styles.component)
            console.log('mounted')
            date.addEventListener('click',()=>{
                SelectDateInput.show(date)
            })
        })
    }

    html() {
        return this.templateHtml
    }
}