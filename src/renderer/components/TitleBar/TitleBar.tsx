import React from 'react';
import cx from 'classnames';

import styles from './TitleBar.scss';
import { ipcRenderer } from 'electron';

import { Popconfirm, Icon } from 'antd';
import 'antd/lib/popconfirm/style/css';

interface IProps {
    onClick?: (e: any) => {};
    [x: string]: any;
}

class TitleBar extends React.Component<IProps> {
    public state = {
        isPushpin: false,
    };

    private pushpin() {
        const nowPushpin = !this.state.isPushpin;

        this.setState({
            isPushpin: nowPushpin,
        });
        return nowPushpin;
    }

    private pushpinChange() {
        const { onClick = () => {} } = this.props;
        const pushpinClick = (e: any) => {
            const isPushpin = this.pushpin();
            ipcRenderer.send('setAlwaysOnTop', isPushpin);
            onClick(e);
        };
        return pushpinClick;
    }

    private closeWindow() {
        return (e: any) => {
            ipcRenderer.send('closeWindow');
        };
    }

    private minimizeWindow() {
        return (e: any) => {
            ipcRenderer.send('minimizeWindow');
        };
    }

    public render() {
        const { ...props } = this.props;

        ipcRenderer.send('setAlwaysOnTop', this.state.isPushpin);

        return (
            <div className={styles.component} {...props}>
                <Popconfirm
                    placement="leftTop"
                    title={'确定退出番茄工作法吗？'}
                    onConfirm={this.closeWindow()}
                    okText="退出"
                    cancelText="取消"
                >
                    <div className={styles.button}>
                        <Icon type="close" />
                    </div>
                </Popconfirm>

                <div
                    className={cx(styles.button, {
                        [styles.buttonClick]: this.state.isPushpin,
                    })}
                    onClick={this.pushpinChange()}
                >
                    <Icon type="pushpin" theme="filled" />
                </div>

                <div className={styles.button} onClick={this.minimizeWindow()}>
                    <Icon type="minus" />
                </div>
            </div>
        );
    }
}

export default TitleBar;
