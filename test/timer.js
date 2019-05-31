const expect = require('chai').expect
const Timer = require('../src/js/timer')

describe('timer tests',function(){
    var timer

    beforeEach(function(){
        timer = new Timer.Timer()
    })

    it('should pass if time return 00:00:00',function(){
        var time = timer.getTime()
        expect(time).to.eql("00:00:00")
    })
})