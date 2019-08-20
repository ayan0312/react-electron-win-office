import React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { initializeIcons } from '@uifabric/icons'
import { FluentCustomizations } from '@uifabric/fluent-theme'
import { Customizer, mergeStyles } from 'office-ui-fabric-react'
import Root from '@/components/Root/Root'
import './index.css'

initializeIcons()
mergeStyles({
    selectors: {
        ':global(body), :global(html), :global(#root)': {
            margin: 0,
            padding: 0,
            height: '100vh',
        },
    },
})

const render = (App: any) => {
    ReactDOM.render(
        <Customizer {...FluentCustomizations}>
            <App />
        </Customizer>,
        document.getElementById('root'),
    )
}

render(Root)
