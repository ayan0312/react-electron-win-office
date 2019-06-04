module.exports = api => {
	const isElectron = process.env.IS_ELECTRON

	const development = api.env([
		'development',
		'test'
	])

	let plugins = [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-export-default-from'
	]

	if (isElectron) {
		if (development) {

		} else {

		}
	}

	return {
		'presets': [
			[
				require('@babel/preset-env'),
				{
					targets: {
						electron: require('electron/package.json').version
					},
					useBuiltIns: 'usage',
					corejs: '3.1.3'
				}
			]
		],
		plugins
	}
}
