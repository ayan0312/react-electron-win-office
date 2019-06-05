import util from '../src/renderer/scripts/util'
var expect = require('chai').expect


describe('format tests',function(){

    it('should pass if isTimeName return false',function(){
        let currentTime = '01:00:00'
        let isTimeName = util.getCurrentTimeName(currentTime) === '晚上'
        
        expect(isTimeName).to.be.false
    })

    it('should pass if isTimeName return true',function(){
        let currentTime = '06:01:00'
        let isTimeName = util.getCurrentTimeName(currentTime) === '早晨'
        
        expect(isTimeName).to.be.true
    })

    it('should pass if isTimeName return true',function(){
        let currentTime = '11:02:35'
        let isTimeName = util.getCurrentTimeName(currentTime) === '上午'
        
        expect(isTimeName).to.be.true
    })

    it('should pass if isTimeName return true',function(){
        let currentTime = '12:00:00'
        let isTimeName = util.getCurrentTimeName(currentTime) === '中午'
        
        expect(isTimeName).to.be.true
    })

    it('should pass if isTimeName return true',function(){
        let currentTime = '14:00:00'
        let isTimeName = util.getCurrentTimeName(currentTime) === '下午'
        
        expect(isTimeName).to.be.true
    })

    it('should pass if isTimeName return true',function(){
        let currentTime = '23:23:25'
        let isTimeName = util.getCurrentTimeName(currentTime) == '晚上'
        
        expect(isTimeName).to.be.true
    })
})