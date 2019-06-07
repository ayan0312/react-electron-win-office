import util from '@/core/util'

import template from './SelectDateInput.art'
import styles from './SelectDateInput.scss'

import { Components } from '@/core/super/components'

import Button from '@/components/Button/Button'

export default class SelectDateInput extends Components{
    constructor(setting = {
        date:'00:00:00'
    }) {
        super()

        this.template = template
        this.styles = styles
        this.setting = setting

        this.init()
    }

    init(){
        let selectDate = SelectDateInput.dateFormat(setting.date)

        this.templateHtml = template({
            styles: styles,
            selectDate: selectDate,
            button: new Button({
                text:'确定',
                type:'default',
                className:styles.button
            }).html()
        })
    }

    html(){
        return this.templateHtml
    }

    static show(ele) {
        let left,
            top

        if (process.env.IS_ELECTRON) {
            left = (350 - 210) / 2 + 'px'
            top = (750 - 211) / 2 + 'px'
        } else {
            left = ele.offsetLeft + 'px'
            top = ele.offsetTop + 'px'
        }

        let date = document.querySelector('.'+styles.component)

        date.style.left = left
        date.style.top = top

        date.style.display = 'block'
    }

    static html() {
        let selectDate = SelectDateInput.dateFormat('00:00:00')

        return template({
            styles: styles,
            selectDate: selectDate,
            button: new Button({
                text:'确定',
                type:'default',
                className:styles.button
            }).html()
        })
    }

    static dateFormat(date) {
        let presentTime = date || util.format('HH:mm:ss')
        let timeName = util.getCurrentTimeName(presentTime)

        let timeCutList = presentTime.split(':'),
            hours = this._timeFormat(timeCutList[0], 'hour'),
            minutes = this._timeFormat(timeCutList[1], 'minute'),
            seconds = this._timeFormat(timeCutList[2], 'second')

        return {
            currentTime: `${presentTime} ${timeName}`,
            minTime: {
                hours,
                minutes,
                seconds
            }
        }
    }

    static _timeFormat(timeNumber, timeType) {
        timeNumber = parseInt(timeNumber)
        let timeFormatArray = []
        if (typeof timeNumber !== 'number') return

        if (['minute', 'second'].includes(timeType)) {
            for (; timeNumber < 60; timeNumber++) {
                timeFormatArray.push(timeNumber)
            }
        } else if (['hour'].includes(timeType)) {
            for (; timeNumber < 24; timeNumber++) {
                timeFormatArray.push(timeNumber)
            }
        } else {
            return
        }

        return timeFormatArray
    }
}