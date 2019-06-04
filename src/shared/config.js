import { build, version } from '../../package.json'

export const config = {
	APP_NAME: build.productName,
	APP_VERSION: version,
	REPO_OWNER: 'ayanTimer',
	REPO_NAME: 'ayanTimer-desktop',
	DEBUG_PROD: process.env.DEBUG_PROD === 'true' || false,
	UPGRADE_EXTENSIONS: process.env.UPGRADE_EXTENSIONS === 'true' || false,
	START_MINIMIZED: process.env.START_MINIMIZED === 'true' || false
}