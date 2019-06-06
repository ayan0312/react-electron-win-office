import template from './NumberInput.art'
import styles from './NumberInput.scss'

export default class NumberInput {
    constructor(setting = {
        number:0,
        type:'default',
        className:''
    }) {
        this.template = template
        this.styles = styles
        this.setting = setting

        this.init()
    }

    init() {
        this.templateHtml = this.template({
            styles: this.styles,
            setting:this.setting
        })
    }

    html(){
        return this.templateHtml
    }

    data(){
        return {

        }
    }

    method(){
        return {
            
        }
    }
    
}