import React from 'react';

import styles from './TimerSetting.scss';

import {
    Developer,
    Export,
    Help,
    HistoryPlan,
    Import,
    MoreSetting,
    SetPlan,
    Sponsor,
} from './components/index';

import { Drawer, Form } from 'antd';
import 'antd/lib/drawer/style/css';

interface IPrors {
    settingName: string;
    visible: boolean;
    onClose: React.MouseEventHandler<HTMLElement>;
}

export default class TimerSetting extends React.Component<IPrors> {
    private selectSetting(selectOptionsName: string) {
        switch (selectOptionsName) {
            case 'setPlan':
                return <SetPlan age={1} name={'2'} />;
            case 'historyPlan':
                return <HistoryPlan />;
            case 'export':
                return <Export />;
            case 'import':
                return <Import />;
            case 'moreSetting':
                return <MoreSetting />;
            case 'help':
                return <Help />;
            case 'sponsor':
                return <Sponsor />;
            case 'developer':
                return <Developer />;
        }
    }

    public render() {
        return (
            <div style={styles.component}>
                <Drawer
                    placement="right"
                    closable={true}
                    width={230}
                    zIndex={51}
                    mask={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    {this.selectSetting(this.props.settingName)}
                </Drawer>
            </div>
        );
    }
}
