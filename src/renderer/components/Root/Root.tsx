import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'

import Pages from '../../pages'

interface IProps {
    store: Store
}

class Root extends React.Component<IProps> {
    constructor(props: any) {
        super(props)
    }

    public render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <Pages />
            </Provider>
        )
    }
}

export default Root
