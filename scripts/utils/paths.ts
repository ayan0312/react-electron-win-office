import path from 'path'

const rootPath = path.resolve(__dirname, '../../')
const srcPath = path.resolve(rootPath, 'src')
const rendererPath = path.resolve(srcPath, 'renderer')
const mainPath = path.resolve(srcPath, 'main')
const sharedPath = path.resolve(srcPath, 'shared')
const buildPath = path.resolve(rootPath, 'dist')

export default {
    rootPath,
    srcPath,
    rendererPath,
    mainPath,
    sharedPath,
    buildPath,
}
