import { ContainerLife } from '../events'

let deps = {}

function dep(name){
    if(!deps[name]){
        deps[name] = {}
        deps[name].count = 0
    }
    
    return ()=>{
        let num = ++deps[name].count
        return num-1
    }
}

function queryCurrentElement(className){
    let num = dep(className)()
    return document.querySelectorAll(`.${className}`)[num]
}

export class Components {
    constructor() {

    }

    mounted(callback) {
        ContainerLife.on('mounted',callback)
    }

    query(className){
        return queryCurrentElement(className)
    }
}