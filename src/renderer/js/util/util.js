const isMobile = /mobile/i.test(window.navigator.userAgent)

const util = {
    format(fmt) {

        let date = new Date()

        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }

        let week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        }

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        }

        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""])
        }

        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            }
        }

        return fmt

    },
    secondToTime(second) {
        const add0 = (num) => num < 10 ? '0' + num : '' + num
        const hour = Math.floor(second / 3600)
        const min = Math.floor((second - hour * 3600) / 60)
        const sec = Math.floor(second - hour * 3600 - min * 60)
        return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
    },
    storage: () => {
        let data = {}

        let fakeStorage = {
            set: (key, value) => {
                if (typeof value !== 'string') {
                    return new TypeError('fakeStorage..')
                }
                data[key] = value
            },
            get: (key) => {
                return data[key]
            }
        }

        if (window.localStorage === undefined) {
            return fakeStorage
        }

        return {
            set: (key, value) => {
                localStorage.setItem(key, value);
            },

            get: (key) => {
                return localStorage.getItem(key)
            }
        }
    },
    isMobile: isMobile
}

export default util