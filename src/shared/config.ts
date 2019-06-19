import { build, version } from '../../package.json';

interface IConfig {
    APP_NAME: string;
    APP_VERSION: string;
    REPO_OWNER: string;
    DEBUG_PROD: boolean;
    UPGRADE_EXTENSIONS: boolean;
    START_MINIMIZED: boolean;
}

export const config: IConfig = {
    APP_NAME: build.productName,
    APP_VERSION: version,
    REPO_OWNER: 'pomodoro',
    DEBUG_PROD: process.env.DEBUG_PROD === 'true' || false,
    UPGRADE_EXTENSIONS: process.env.UPGRADE_EXTENSIONS === 'true' || false,
    START_MINIMIZED: process.env.START_MINIMIZED === 'true' || false,
};
