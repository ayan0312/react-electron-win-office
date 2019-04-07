Ayan.use(function (base, ex) {
    var util = base.util

    /**
     * 传入被修改的元素
     * @example
     * var date = new Timer("#time") 
     */
    var Timer = function (elem) {
        this.element = ex.sel(elem);
        this.timer = null;
        this.timerAction = false;
    }

    Timer.prototype = {
        dateTool: util.date,
        formatNum: function (number) {
            if (number < 10) {
                return '0' + number
            }

            return number
        },
        tip: function (msg) {

            var mark = ex.sel("#mark")
            var tip = ex.sel("#tip")
            tip.innerHTML = msg
            tip.style.display = "block"
            mark.style.display = "block"
        },
        /**
         * 运行定时器 
         * 
         */
        actionTime: function (time, msg) {
            if (!this.timerAction) {
                this.timerAction = true
            } else {
                clearInterval(this.timer)
            }
            var _this = this;
            var time = Math.abs(parseFloat(time));


            var time_str,
                second,
                h,
                m,
                s;

            if (!util.lang.isNumber(time)) {
                util.error('请传入正确的时间类型,time is not a number')
            }

            second = time * 60;

            this.timer = setInterval(function () {
                if (second <= 0) {
                    if(msg){
                        _this.tip(msg);
                    }
                    _this.element.innerHTML = "00:00:00"
                    clearInterval(_this.timer)
                    this.timerAction = false;
                    return
                }

                h = second / 60 / 60
                if (h >= 1) { m = (second / 60) % 60 }
                else {
                    m = second / 60
                }
                s = Math.round(((second / 60) - Math.floor(second / 60)) * 60)

                time_str = _this.formatNum(Math.floor(h)) + ":" + _this.formatNum(Math.floor(m)) + ":" + _this.formatNum(s)

                _this.element.innerHTML = time_str
                second--;
            }, 1000)
        },
        /**
         * 查询当前时间,暂时废弃
         */
        queryTime: function () {
            var _this = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                _this.element.innerHTML = _this.dateTool.format("HH:mm:ss")
            }, 1000)
        },
        /**
         * 更新当前时间 
         * @param any 数字或字符串形式
         */
        updateTime: function (any, msg) {
            clearInterval(this.timer);
            this.actionTime(any, msg);
        },
        /**
         * 重置时间
         */
        resetTime: function () {
            clearInterval(this.timer);
            this.actionTime(0);
        },
    }

    base.ready(function () {
        document.body.addEventListener('touchstart', function () { });
        if (localStorage.getItem('workTime')) {
            ex.sel("#getWork").value = localStorage.getItem('workTime');
        }

        if (localStorage.getItem('restTime')) {
            ex.sel("#getRest").valuegetRestTime = localStorage.getItem('restTime');

        }
    })

    base.ready(function () {
        var timer = new Timer("#time");

        let timerControlFactory = function (elem1, fn) {
            fn = fn || function () { };
            ex.sel(elem1).addEventListener('click', function (e) {
                fn(e);
            }, false)
        }


        timerControlFactory("#mark", function (e) {
            ex.sel("#tip").style.display = "none"
            ex.sel("#mark").style.display = "none"
        })


        timerControlFactory("#work", function (e) {
            var getWorkTime = parseFloat(ex.sel("#getWork").value)
            timer.updateTime(getWorkTime, "工作时间: " + getWorkTime + " 分钟，结束")
            localStorage.setItem('workTime', getWorkTime)
        })
        timerControlFactory("#rest", function (e) {
            var getRestTime = parseFloat(ex.sel("#getRest").value)
            timer.updateTime(getRestTime, "休息时间: " + getRestTime + " 分钟，结束")
            localStorage.setItem('restTime', getRestTime)
        })
        timerControlFactory("#stop", function (e) {
            timer.resetTime();
        })
        timerControlFactory("#now", function (e) {
            timer.queryTime();
        })
    })
})