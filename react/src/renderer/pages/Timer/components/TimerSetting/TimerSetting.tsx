import React from 'react'

import styles from './TimerSetting.scss'

import TimerSettingMenuContent from './components/index'

import { Drawer, Form } from 'antd'
import 'antd/lib/drawer/style/css'

interface IPrors {
    settingName: string
    visible: boolean
    onClose: any
}

export default class TimerSetting extends React.Component<IPrors> {
    private selectSetting(selectOptionsName: string) {
        switch (selectOptionsName) {
            case 'setPlan':
                return <TimerSettingMenuContent.SetPlan age={1} name={'2'} />
            case 'historyPlan':
                return <TimerSettingMenuContent.HistoryPlan />
            case 'export':
                return <TimerSettingMenuContent.Export />
            case 'import':
                return <TimerSettingMenuContent.Import />
            case 'moreSetting':
                return <TimerSettingMenuContent.MoreSetting />
            case 'help':
                return <TimerSettingMenuContent.Help />
            case 'sponsor':
                return <TimerSettingMenuContent.Sponsor />
            case 'developer':
                return <TimerSettingMenuContent.Developer />
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
        )
    }
}
