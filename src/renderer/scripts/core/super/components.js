import { ContainerLife } from '../events'

export class Components {
    constructor() {

    }

    mounted(callback) {
        ContainerLife.on('mounted',callback)
    }
}