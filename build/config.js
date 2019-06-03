const path = require('path')

module.exports = {
    electron:{
        path:{
            entry:{
                'renderder':path.resolve(__dirname,'../src/renderer/js','index.js')
            },
            output:path.resolve(__dirname, '../dist/electron-build')
        },
        server:{
            port: 8081
        }
    },
    web:{
        path:{
            entry:{
                'ayanTimer':path.resolve(__dirname,'../src/renderer/js','index.js')
            },
            output:path.resolve(__dirname, '../dist/build')
        },
        server:{
            port: 8082
        }
    }
}