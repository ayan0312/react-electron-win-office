import template from './setting.art'
import styles from './setting.scss'

import IconButton from '@/components/IconButton/IconButton'
import Button from '@/components/Button/Button'
import TextInput from '@/components/TextInput/TextInput'
import DateButton from '@/components/DateButton/DateButton'

import upSvgIcon from '@/assets/up.svg'

export default class Setting {
    constructor() {
        this.template = template
        this.styles = styles

        this.init()
    }

    data() {
        return {
            icon: new IconButton({
                type: 'scale',
                icon: upSvgIcon,
                className: styles.cancelButton
            }).html(),
            button: new Button({
                text: '提交',
                type: 'default'
            }).html(),
            input: new TextInput({
                value: '',
                placeholder: '请填写任务名称',
                className: styles.textInput
            }).html(),
            date:{
                start:new DateButton({
                    date:'00:00:00 凌晨',
                    className:styles.start
                }),
                end:new DateButton({
                    date:'01:00:00 凌晨',
                    className:styles.end
                })
            }
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            icon: data.icon,
            button: data.button,
            input:data.input,
            start:data.date.start.html(),
            end:data.date.end.html()
        })

        
    }

    bindEvents(data) {
        let start = data.date.start
        let end = data.date.end

        start.bindEvents()
    }

    html() {
        return this.templateHtml
    }
}