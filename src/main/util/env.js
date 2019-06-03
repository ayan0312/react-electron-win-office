import Config from './config'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

export class Env {
    static getEnv() {
        return env
    }

    static isDev() {
        return env === 'development'
    }

    static isProd() {
        return env === 'production'
    }
}

export class ResourcesDirectory {
    constructor(resDir = {}) {
        this.ResourcesDirectory = Object.assign(resDir, Config)
        this.localhost = this.ResourcesDirectory.localhost
        this.indexDirectory = this.ResourcesDirectory.directory
    }

    getIndex() {
        if (Env.isDev) {
            return this.getUrl()+'/'+this.indexDirectory.index.name
        } else {
            return this.indexDirectory.url+'/'+this.indexDirectory.index.name
        }
    }

    getUrl() {
        if (Env.isDev) {
            return `http://${this.ResourcesDirectory.localhost.url}:${this.ResourcesDirectory.localhost.port}`
        } else {
            return this.ResourcesDirectory.request
        }
    }
}