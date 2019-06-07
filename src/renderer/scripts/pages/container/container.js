import template from './container.art'
import styles from './container.scss'

import Control from '@/pages/control/control'
import Sidebar from '@/pages/sidebar/sidebar'
import Setting from '@/pages/setting/setting'

import Square from '@/components/Square/Square'

import {Pages} from '@/core/super/pages'

export default class Container extends Pages {
    constructor(app) {
        super()

        this.template = template
        this.styles = styles
        this.app = app

        this.init()
    }

    data() {
        return {
            control:new Control(),
            sidebar:new Sidebar(),
            setting:new Setting(),
            square:new Square()
        }
    }

    init() {
        let data = this.data()

        this.templateHtml = this.template({
            styles: this.styles,
            control:data.control.html(),
            sidebar:data.sidebar.html(),
            setting:data.setting.html(),
            square:data.square.html()
        })

        this.bindEvents(data)
    }

    bindEvents(data){
        //test
        this.app.innerHTML = this.templateHtml
        this.container = document.querySelector('.'+styles.component)
        
        super.mounted()
    }
}