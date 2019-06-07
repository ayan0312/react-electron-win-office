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

    method(){
        return {

        }
    }

    init() {
        let data = this.data()
        let method = this.method()

        this.templateHtml = this.template({
            styles: this.styles,
            setting: this.setting,
            selectDate: SelectDateInput.html()
        })
        super.mounted(()=>{

            super.query(styles.component).addEventListener('click',function(){
                SelectDateInput.show(this)
            })
        })

        
    }



    html() {
        return this.templateHtml
    }
}