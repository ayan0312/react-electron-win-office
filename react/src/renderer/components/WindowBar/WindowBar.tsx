import React from 'react'
import cx from 'classnames'

import styles from './WindowBar.scss'
import { ipcRenderer } from 'electron'
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button/DefaultButton/DefaultButton'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

interface IProps {
    onClick?: (e: any) => {}
    [x: string]: any
}

class TitleBar extends React.Component<IProps> {
    public state = {
        isPushpin: false,
        isFullScreen: false,
    }

    private isState(state: any, changeState: any) {
        const nowState = !changeState

        this.setState({
            [state]: nowState,
        })

        return nowState
    }

    private pushpinChange() {
        const { onClick = () => {} } = this.props
        const pushpinClick = (e: any) => {
            const isPushpin = this.isState('isPushpin', this.state.isPushpin)
            ipcRenderer.send('setAlwaysOnTop', isPushpin)
            onClick(e)
        }
        return pushpinClick
    }

    private closeWindow() {
        return (e: any) => {
            ipcRenderer.send('closeWindow')
        }
    }

    private minimizeWindow() {
        return (e: any) => {
            ipcRenderer.send('minimizeWindow')
        }
    }

    private fullScreenWindow() {
        return () => {
            const isFullScreen = this.isState('isFullScreen', this.state.isFullScreen)
            ipcRenderer.send('fullScreenWindow', isFullScreen)
        }
    }

    public render() {
        const { ...props } = this.props

        ipcRenderer.send('setAlwaysOnTop', this.state.isPushpin)

        return (
            <div className={styles.component} {...props}>
                <div className={styles.button} onClick={this.fullScreenWindow()}>
                    <DefaultButton
                        data-automation-id="test"
                        allowDisabledFocus={true}
                        iconProps={{ iconName: 'Cancel' }}
                    />
                </div>

                <div
                    className={styles.button}
                    onClick={this.minimizeWindow()}
                    style={this.state.isFullScreen ? { display: 'none' } : { display: 'block' }}
                >
                    <Icon iconName="Cancel" className="ms-IconExample" />
                </div>

                <div
                    className={cx(styles.button, {
                        [styles.buttonClick]: this.state.isPushpin,
                    })}
                    onClick={this.pushpinChange()}
                    style={this.state.isFullScreen ? { display: 'none' } : { display: 'block' }}
                ></div>
            </div>
        )
    }
}

export default TitleBar
