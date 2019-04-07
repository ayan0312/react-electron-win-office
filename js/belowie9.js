function Below() {
    this.name = "below"
}

Below.prototype = {
    browserVersionControl: function () {
        var v = this.belowIE9();
        //true为低于ie9
        if (!v) return;
        document.body.innerHTML = "<p style='font-family: Arial, Helvetica, sans-serif;font-size:16px;text-align:center;margin-top:20px'>浏览器版本低于IE9，请切换浏览器，推荐chrome</p>";
        document.body.style.background = "rgb(222, 156, 83)";
        
    },

    belowIE9: function () {
        if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 9) {
            return true;
        } else {
            return false;
        }
    },

    main: function () {
        this.browserVersionControl();
    }
}

window.onload = function () {
    var below = new Below();
    below.main();
}


