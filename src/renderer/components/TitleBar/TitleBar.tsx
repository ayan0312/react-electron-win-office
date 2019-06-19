import React from 'react';
import cx from 'classnames';

import { Icon } from 'antd';
import styles from './TitleBar.scss';

import { ipcRenderer } from 'electron';

interface IProps {
    onClick?: (e: any) => {};
    [x: string]: any;
}

class TitleBar extends React.Component<IProps> {
    public state = {
        isPushpin: false
    }

    public pushpin() {
        let nowPushpin = !this.state.isPushpin

        this.setState({
            isPushpin: nowPushpin
        })
        return nowPushpin
    }

    public pushpinChange(callback: Function = (e: any) => { }) {
        const { onClick = () => { } } = this.props;

        const pushpinClick = (e: any) => {
            let isPushpin = this.pushpin()

            ipcRenderer.send('setAlwaysOnTop', isPushpin)

            callback(e);
            onClick(e);
        };

        return pushpinClick
    }

    public closeWindow(callback: Function = (e: any) => { }) {
        return (e: any) => {
            ipcRenderer.send('closeWindow')
        }
    }

    public render() {
        const { ...props } = this.props;

        ipcRenderer.send('setAlwaysOnTop', this.state.isPushpin)

        return (
            <div className={styles.component} {...props}>
                <div
                    className={styles.button}
                    onClick={this.closeWindow()}
                >
                    <Icon type="close" />
                </div>
                <div
                    className={cx(styles.button, {
                        [styles.buttonClick]: this.state.isPushpin
                    }
                    )}
                    onClick={this.pushpinChange()}
                >
                    <Icon type="pushpin" theme="filled" />
                </div>
            </div>
        );
    }
}

export default TitleBar;
