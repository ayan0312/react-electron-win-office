let env = process.env.NODE_ENV

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
    constructor() {
        this.port = process.env.PORT || 1212
    }

    getIndexURL() {
        return `http://localhost:${this.port}/index.html`
    }
}