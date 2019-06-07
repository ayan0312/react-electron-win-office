import util from './util'
import Template from './template'
import Storage from './storage'
import elements from '../element/index'

export const version = '0.2.0'

export default class AyanTimer {
    constructor(options) {
        this.version = version

        this.timer = new Timer()
        this.storage = new Storage()
        this.options = this._handleOption(options)
        if (this.options.time === null) {
            this.options.time = this.timer.currentTime
        }

        this._init()
    }

    about() {
        return `version:${this.version}`
    }

    static about() {
        return `version:${version}`
    }

    on(eventName, eventCallback) {
        this.timer.on(eventName, eventCallback)
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
        this.select = new elements.Select(this)
        

        let buttons = this.template.getItem('buttons')
        let time = this.template.getItem('time')

        let setTime = (currentTime) => {
            time.innerHTML = currentTime
        }

        buttons.work.addEventListener('click', (event) => {
            let work = this.template.getItem('options').work.value

            this.storage.set('work', work)

            this.timer.updateTime(work, setTime)
        }, false)

        buttons.rest.addEventListener('click', (event) => {
            let rest = this.template.getItem('options').rest.value

            this.storage.set('rest', rest)

            this.timer.updateTime(rest, setTime)
        }, false)

        buttons.reset.addEventListener('click', (event) => {
            this.timer.cancelTime(setTime)
        }, false)

        buttons.now.addEventListener('click', (event) => {
            this.timer.queryPresentTime(setTime)
        }, false)

        this._bindEvents()
    }

    _bindEvents() {
    }
}

class Timer {
    constructor() {
        this.timer = null
        this.isTimerPlaying = false
        this.time = '00:00'

        this.events = {}
        this.timerEvents = [
            'start',
            'cancel',
            'stop',
            'now',
            'timing',
            'clear'
        ]
    }

    get currentTime() {
        return this.time
    }

    set currentTime(value) {
        this.time = value
    }

    _setInterval(callback = () => { }, interval) {
        return setInterval(() => {
            this._trigger('timing')
            callback(this.currentTime)
        }, interval)
    }

    _clearInterval(timer = null) {
        if (timer === null) return
        clearInterval(timer)
        this.timer = null
        this._trigger('clear')
    }

    _type(name) {
        if (this.timerEvents.indexOf(name) !== -1) {
            return 'timer';
        }

        console.error(`Unknown event name: ${name}`);
        return null;
    }

    _trigger(eventName, eventData = {}) {
        if (this.events[eventName] && this.events[eventName].length) {
            this.events[eventName].map((callback) => {
                callback(eventData)
            })
        }
    }

    on(eventName, eventCallback) {
        if (this._type(eventName) && typeof eventCallback === 'function') {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            this.events[eventName].push(eventCallback);
        }
    }


    createAsyncTimerResource(item) {
        if (!this.timerAsyncRes) {
            this.timerAsyncRes = {}
        }

        this.timerAsyncRes[item] = new Timer()

        return this.timerAsyncRes[item]
    }

    getAsyncTimerResource(item) {
        return this.timerAsyncRes[item]
    }

    startTime(time, callback = () => { }) {
        this._trigger('start')

        if (!this.isTimerPlaying) {
            this.isTimerPlaying = true
        } else {
            this._clearInterval(this.timer)
        }

        time = Math.abs(parseFloat(time))

        if (typeof time !== 'number') {
            return new TypeError('请传入正确的时间类型,time is not a number')
        }

        let second = time * 60

        this.timer = this._setInterval(() => {
            if (second <= 0) {
                this.currentTime = '00:00'
                this._clearInterval(this.timer)
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
        this._clearInterval(this.timer)

        this.timer = this._setInterval(() => {
            this.currentTime = util.format('HH:mm:ss')
            callback(this.currentTime)
        }, 1000)
        this._trigger('now')
    }

    updateTime(time, callback = () => { }) {
        this._clearInterval(this.timer)

        this.startTime(time, callback)
    }

    cancelTime(callback) {
        this._clearInterval(this.timer)

        this.currentTime = '00:00'
        callback(this.currentTime)
        this._trigger('cancel')
    }
}