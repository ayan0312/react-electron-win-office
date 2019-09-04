import { version } from '../../package.json'

export const config = {
    APP_VERSION: version,
    REPO_OWNER: 'pomodoro',
    DEBUG_PROD: process.env.DEBUG_PROD === 'true' || false,
    UPGRADE_EXTENSIONS: process.env.UPGRADE_EXTENSIONS === 'true' || false,
    START_MINIMIZED: process.env.START_MINIMIZED === 'true' || false,
}
