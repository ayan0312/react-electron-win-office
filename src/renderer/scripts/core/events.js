export default class EventsTemplateClass {
    constructor(eventTemplateName, eventsList) {
        this.eventTemplateName = eventTemplateName
        this.eventsList = eventsList
        this.events = {}
    }

    type(name) {
        if (this.eventsList.indexOf(name) !== -1) {
            return this.eventTemplateName
        }

        console.error(`Unknown event name: ${name}`)
        return null
    }

    trigger(eventName, eventData = {}) {
        if (this.events[eventName] && this.events[eventName].length) {
            this.events[eventName].map((callback) => {
                callback(eventData)
            })
        }
    }

    on(eventName, eventCallback) {
        if (this.type(eventName) && typeof eventCallback === 'function') {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            this.events[eventName].push(eventCallback);
        }
    }
}

let container = new EventsTemplateClass(
    'container',
    ['mounted']
)

export class ContainerLife {
    static trigger(eventName, eventData = {}) {
        container.trigger(eventName, eventData)
    }

    static on(eventName, eventCallback) {
        container.on(eventName, eventCallback)
    }
}