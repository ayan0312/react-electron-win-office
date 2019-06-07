import { ContainerLife } from '../events'

export class Pages {
    constructor() {

    }

    mounted() {
        ContainerLife.trigger('mounted')
    }
}