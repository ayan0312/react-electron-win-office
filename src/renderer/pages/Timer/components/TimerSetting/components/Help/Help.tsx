import React from 'react'

import styles from './Help.scss'

import { shell } from 'electron'

import { Tooltip } from 'antd'
import 'antd/lib/tooltip/style/css'

interface IProps {}

export default class Help extends React.Component<IProps> {
    private skip(href: string) {
        const hrefLocal = href
        return (e: any) => {
            shell.openExternal(hrefLocal)
        }
    }

    render() {
        return (
            <div className={styles.component}>
                <h4>帮助</h4>
                <p>
                    <Tooltip placement="bottomLeft" title={'github:ayan0312/pomodoro'}>
                        <a href="#" onClick={this.skip('https://github.com/ayan0312/pomodoro')}>
                            Pomodoro
                        </a>
                    </Tooltip>
                    的使用方法非常简单，按步骤迅速了解上手使用。
                </p>

                <h4>定制计划</h4>
                <p>
                    点击<strong>设置计划</strong>
                    选项，选择自己需要的日期范围，然后再定制各天的番茄钟。
                </p>

                <h4>开始计划</h4>
                <p style={{ marginBottom: '5px' }}>
                    开始计划后，<strong>Pomodoro</strong>会自动开始并按照计划安排时间。
                </p>
                <p>同时右上角会显示接下来的部分番茄钟所按安排的时间。</p>

                <h4>短期时间</h4>
                <p style={{ marginBottom: '5px' }}>
                    如果不打算按计划开始番茄钟，可以选择普通定时。
                </p>
                <p>
                    设置好工作和休息时间，就可以通过<strong>工作</strong>按钮点击开始。
                </p>

                <h4>提醒时间设置</h4>
                <p style={{ marginBottom: '5px' }}>
                    可以通过铃声来提醒是否到了<strong>工作/休息</strong>时间，并设置铃声的播放时间
                </p>
                <p>到了时间或者手动确认就可以开始下一个番茄钟。</p>

                <div className={styles.line}></div>

                <h4>其他设置</h4>
                <p>
                    可以查看<strong>历史计划</strong>，检查自己的计划完成度，也可以通过
                    <strong>导入数据或导出数据</strong>来导入或导出历史计划和设置好的计划
                </p>
            </div>
        )
    }
}
