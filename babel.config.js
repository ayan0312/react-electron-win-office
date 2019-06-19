module.exports = api => {
	
	const development = api.env([
		'development',
		'test'
	])

	return {
		'presets': [
			[
				require('@babel/preset-env'),
				{
					targets: {
						electron: require('electron/package.json').version
					},
					useBuiltIns: 'usage',
					corejs: '3.1.4'
				}
			]
		]
	}
}
