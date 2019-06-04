export class Env {
    static env = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

    static getEnv() {
        return this.env
    }

    static isDev() {
        return this.env === 'development'
    }

    static isProd() {
        return this.env === 'production'
    }
}

export class ResourcesDirectory {
    constructor() {
        this.port = process.env.PORT || 1212
    }

    getIndexURL() {
        return Env.isDev() ? `http://localhost:${this.port}/index.html` : `file://${__dirname}/index.html`
    }
}