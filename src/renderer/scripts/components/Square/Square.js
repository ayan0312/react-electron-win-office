import template from './Square.art'
import styles from './Square.scss'

export default class Square {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    init() {
        this.templateHtml = this.template({
            styles: this.styles
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