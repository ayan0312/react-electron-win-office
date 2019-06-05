import SelectDateInput from '../components/SelectDateInput/SelectDateInput'

export default class Select {
    constructor(options) {
        this.template = options.template
        this.options = options

        this.init()
        
    }

    init(){
        console.log(this.options)
        this.SelectDateInput = new SelectDateInput(this.template)

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

        setting.start.addEventListener('click',(e)=>{
            
            this.SelectDateInput.show(setting.start)
        })

        setting.end.addEventListener('click',(e)=>{
            this.SelectDateInput.show(setting.end)
        })
    }
}