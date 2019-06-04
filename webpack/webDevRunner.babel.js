import renderer from './webpackConfigRenderer.babel.js' 
import merge from 'merge'

export default merge(renderer,{
    target:'web'
})