import util from '@/core/util'
import dateTemplate from './SelectDateInput.art'
import styles from './SelectDateInput.scss'
import EventsTemplateClass from '@/core/events'

import Button from '@/components/Button/Button'

export default class SelectDateInput {
    constructor(template) {
        this.container = template.container
        this.template = template
        this.elements = {}
        this.events = new EventsTemplateClass('dateInput', ['submit', 'input'])

        this.dateString = '00:00:00 凌晨'

        this._init()
    }

    _init() {

        this.selectDate = SelectDateInput.dateFormat()

        this.elements.date = this.container.querySelector('.ayan-date-mark')

        this.elements.time = this.container.querySelector('.ayan-date-mark-info')
        this.elements.button = this.container.querySelector('.ayan-date-mark-button')

        this.elements.list = {
            hours: this.container.querySelector('.ayan-date-mark-select-hour'),
            minutes: this.container.querySelector('.ayan-date-mark-select-minutes'),
            seconds: this.container.querySelector('.ayan-date-mark-select-seconds')
        }

        this.bindEvent()
    }

    bindEvent() {
        this.elements.button.addEventListener('click', () => {
            this.events.trigger('submit', this.dateString)
            this.elements.date.style.display = 'none'
        })
    }

    set dateInputValue(value) {
        this.dateInputChange(value)
    }

    get dateInputValue() {
        return this.dateString
    }

    dateInputChange() {

        this.resetDateSelect({
            hours: [],
            minutes: [],
            seconds: []
        })
    }

    resetDateSelect(options = { hours: [], minutes: [], seconds: [] }) {

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

        return dateTemplate({
            styles: styles,
            selectDate: selectDate,
            button: new Button({
                text:'确定',
                type:'default',
                className:''
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