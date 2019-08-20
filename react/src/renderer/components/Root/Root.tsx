import React from 'react'
import TitleBar from '@/components/WindowBar/WindowBar'
import { ChoiceGroupIconExample } from '@/pages/index'

class Root extends React.Component {
    public render() {
        return (
            <div>
                <TitleBar />
                <ChoiceGroupIconExample />
            </div>
        )
    }
}

export default Root
