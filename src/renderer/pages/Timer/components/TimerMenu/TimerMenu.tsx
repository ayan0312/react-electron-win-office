import React from 'react';

import styles from './TimerMenu.scss';

import TimerSetting from '../TimerSetting/TimerSetting';

import { Drawer } from 'antd';
import 'antd/lib/drawer/style/css';

interface IProps {
    onClose: React.MouseEventHandler<HTMLElement>;
    visible: boolean;
}

export default class TimerMenu extends React.Component<IProps> {
    public state: any = {
        presetNames: {
            options: {
                setPlan: '设置计划',
                historyPlan: '历史计划',
            },
            advancedOptions: {
                export: '导出数据',
                import: '导入数据',
                moreSetting: '更多设置',
            },
            about: {
                help: '帮助',
                sponsor: '赞助',
                developer: '开发者',
            },
        },
        currentSettingName: '',
        visible: false,
    };

    private showCurrentSetting() {
        return (e: any) => {
            const name = e.currentTarget.getAttribute('data-name');
            this.setState({
                currentSettingName: name,
                visible: true,
            });
        };
    }

    private onClose = () => {
        this.setState({
            visible: false,
        });
    };

    public render() {
        const { presetNames } = this.state;

        const options = Object.keys(presetNames).map((presetKey: string) => {
            const currentOptions = presetNames[presetKey];
            const optionsList = Object.keys(currentOptions).map((optionsKey: string) => (
                <li key={optionsKey} data-name={optionsKey} onClick={this.showCurrentSetting()}>
                    <span>{currentOptions[optionsKey]}</span>
                </li>
            ));

            const optionsTitle = (presetKey: string) => {
                switch (presetKey) {
                    case 'options':
                        return '选项';
                    case 'advancedOptions':
                        return '高级选项';
                    case 'about':
                        return '关于';
                }
            };

            return (
                <div key={presetKey}>
                    <h4>{optionsTitle(presetKey)}</h4>
                    <ul>{optionsList}</ul>
                </div>
            );
        });

        return (
            <Drawer
                placement="right"
                closable={true}
                zIndex={50}
                width={150}
                bodyStyle={{ padding: '30px 0' }}
                onClose={this.props.onClose}
                visible={this.props.visible}
            >
                <div className={styles.component}>{options}</div>
                <TimerSetting
                    settingName={this.state.currentSettingName}
                    onClose={this.onClose}
                    visible={this.state.visible}
                />
            </Drawer>
        );
    }
}
