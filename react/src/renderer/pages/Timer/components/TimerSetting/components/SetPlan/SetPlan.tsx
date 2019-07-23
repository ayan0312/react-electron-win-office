import React from 'react'

import styles from './SetPlan.scss'

import { DatePicker, Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import 'antd/lib/date-picker/style/css'

interface UserFormProps extends FormComponentProps {
    age: number
    name: string
}

class SetPlan extends React.Component<UserFormProps, any> {
    public onChange = (date: any, dateString: any) => {}

    handleSubmit = (e: any) => {
        e.preventDefault()
        this.props.form.validateFields((err: any, values: any) => {
            if (err) {
                return
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        }

        return (
            <div className={styles.component}>
                <h4>设置计划</h4>
                <p style={{ textIndent: '1em' }}>
                    <strong>注意：</strong>
                    如果不填些日期范围的话，会默认添加到基础计划，可通过选择开始。
                </p>

                <div className={styles.line}></div>

                <Form onSubmit={this.handleSubmit} className={styles.form}>
                    <div className={styles.list}>
                        <p>
                            <strong>开始日期：</strong>
                        </p>
                        <Form.Item>
                            {getFieldDecorator('date-time-picker', config)(
                                <DatePicker
                                    className={styles.dateInput}
                                    onChange={this.onChange}
                                />,
                            )}
                        </Form.Item>
                    </div>
                    <div className={styles.list}>
                        <p>
                            <strong>结束日期：</strong>
                        </p>
                        <Form.Item>
                            {getFieldDecorator('date-time-picker', config)(
                                <DatePicker
                                    className={styles.dateInput}
                                    onChange={this.onChange}
                                />,
                            )}
                        </Form.Item>
                    </div>
                    <div className={styles.list}>
                        <p>
                            <strong>工作时长</strong>
                        </p>
                        <input type="text" />
                    </div>
                    <div className={styles.list}>
                        <p>
                            <strong>休息时长</strong>
                        </p>
                        <input type="text" />
                    </div>
                    <div className={styles.list}>
                        <p>
                            <strong>备注：</strong>
                        </p>
                        <input type="text" />
                    </div>
                </Form>
            </div>
        )
    }
}
const App = Form.create<UserFormProps>({})(SetPlan)

export default App
