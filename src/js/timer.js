import util from './util/util'
import Template from './template'
import Storage from './storage'

class Timer {
    constructor() {
        this.timer = null
        this.isTimerPlaying = false
        this.currentTime = "00:00"
    }

    getTime() {
        return this.currentTime
    }

    getTimerStatus() {
        if (this.isTimerPlaying) {
            return 'playing'
        } else {
            return 'pause'
        }
    }

    startTime(time, callback = function () { }) {
        if (!this.isTimerPlaying) {
            this.isTimerPlaying = true
        } else {
            clearInterval(this.timer)
        }

        time = Math.abs(parseFloat(time))

        if (typeof time !== 'number') {
            return new TypeError('请传入正确的时间类型,time is not a number')
        }

        let second = time * 60

        this.timer = setInterval(() => {
            if (second <= 0) {
                this.currentTime = "00:00"
                clearInterval(this.timer)
                this.isTimerPlaying = false

                callback(this.currentTime)
                return
            }

            let _TimeString = util.secondToTime(second)
            this.currentTime = _TimeString

            callback(this.currentTime)

            second--
        }, 1000)
    }

    queryPresentTime(callback) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
            this.currentTime = util.format("HH:mm:ss")
            callback(this.currentTime)
        }, 1000)
    }

    updateTime(time, callback = function () { }) {
        clearInterval(this.timer)
        this.startTime(time, callback)
    }

    resetTime(callback) {
        clearInterval(this.timer)
        this.startTime(0,callback)
    }
}

export default class AyanTimer {
    constructor(options) {
        this.timer = new Timer()
        this.storage = new Storage()

        this.options = this._handleOption(options)
        if (this.options.time === null) {
            this.options.time = this.timer.currentTime
        }

        this._init()
    }

    _handleOption(options) {

        let defaultOption = {
            container: options.container || document.getElementById('ayan-timer'),
            time: options.time ? util.secondToTime(options.time) : null,
            work: this.storage.get('work') || 25,
            rest: this.storage.get('rest') || 5
        }

        return defaultOption
    }

    _init() {

        this.template = new Template(this.options)

        this._bindEvents()
    }

    _bindEvents() {
        let options = this.template.getItem('options')
        let buttons = this.template.getItem('buttons')
        let time = this.template.getItem('time')

        let setTime = (currentTime)=>{
            time.innerHTML = currentTime
        }

        buttons.work.addEventListener('click', (event) =>{
            let work = this.template.getItem('options').work.value

            this.storage.set('work', work)

            this.timer.updateTime(work, setTime)
        }, false)

        buttons.rest.addEventListener('click', (event)=> {
            let rest = this.template.getItem('options').rest.value

            this.storage.set('rest', rest)

            this.timer.updateTime(rest, setTime)
        }, false)

        buttons.reset.addEventListener('click', (event)=> {
            this.timer.resetTime(setTime)
        }, false)

        buttons.now.addEventListener('click', (event)=> {
            this.timer.queryPresentTime(setTime)
        }, false)

    }
}