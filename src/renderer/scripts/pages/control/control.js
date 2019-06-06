import template from './control.art'
import styles from './control.scss'

import Button from '@/components/Button/Button'
import NumberInput from '@/components/NumberInput/NumberInput'

export default class Control {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    data() {
        return {
            buttons: {
                work: new Button({
                    text: '工作',
                    type: 'primary'
                }).html(),
                rest: new Button({
                    text: '休息',
                    type: 'primary'
                }).html(),
                cancel: new Button({
                    text: '取消',
                    type: 'default'
                }).html(),
                now: new Button({
                    text: '查看当前时间',
                    type: 'default'
                }).html()
            },
            inputs:{
                workTime:new NumberInput({
                    number:25
                }).html(),
                restTime:new NumberInput({
                    number:5
                }).html()
            }
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            buttons: data.buttons,
            inputs:data.inputs
        })
    }

    html(){
        return this.templateHtml
    }
}