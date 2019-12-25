import React from 'react'
import { Form, DatePicker, Select } from 'antd';
import './InputHeader.css'

const { Option } = Select;

class TimeRelatedForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            layout: 'inline',
            hideRequiredMark: true,
            colon: false,
            // labelCol: { span: 9 },
            // wrapperCol: { span: 15 }
        };
        return (
            <Form {...formItemLayout} onChange={this.handleSubmit}>
                <Form.Item label="起始日期">
                    {getFieldDecorator('startAt')(<DatePicker />)}
                </Form.Item>
                {/* <Col span={24}> */}
                <Form.Item label="结束日期" >
                    {getFieldDecorator('endAt')(<DatePicker />)}
                </Form.Item>
                {/* </Col>     */}
                {this.props.selectInput.map((val, index) => {
                    return (
                        <Form.Item label={val.label} key={index}>
                    {getFieldDecorator(val.key, {initialValue: '全部'})(<Select
                        placeholder="请选择"
                        style={{ width: 150 }}
                    >
                        {Object.keys(this.props[val.key]).map((val, index) => <Option value={val} key={index}>{val}</Option>)}
                    </Select>)}
                </Form.Item>
                    )
                })}
            </Form>
        );
    }
}


export default Form.create({
    onValuesChange: (props, newVal, allVal) => {
        props.fn(allVal)
    }
})(TimeRelatedForm);