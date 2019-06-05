export default class Select {
    constructor(options) {
        this.template = options.template
        this.options = options

        this.bindEvent()
    }

    bindEvent() {
        let select = this.template.getItem('select')
        let setting = this.template.getItem('setting')

        select.plan.addEventListener('click',(e)=>{
            setting.setting.style.top = "0"
        })

        setting.cancel.addEventListener('click',(e)=>{
            setting.setting.style.top = "-100%"
        })
    }
}