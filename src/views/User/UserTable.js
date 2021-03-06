import React from 'react'
import { Table, Modal, Card, Button } from 'antd'
import InputHeader from 'components/Header/InputHeader.js'
import data from './Data.js'

const selectData = (() => {
    const obj = {
        jurisdiction: {
            全部: '',
            系统: '',
            一般: '',
        },
        name: {
            全部: '',
        },
        group: {
            全部: '',
            高抛用户: '',
            河道监控: '',
            安全及身份识别: '',
            设备检测: '',
        },
    }
    data.forEach(val => {
            obj['name'][val['name']] = ''
    })
    return obj
})()

const selectInput = [
    { label: '按权限', key: 'jurisdiction' },
    { label: '按姓名', key: 'name' },
    { label: '按群组', key: 'group' },
]

export default class HelmetTable extends React.Component {
    state = { data, imgsrc: '', visible: false, imgTitle: '', imgLoading: false }
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '权限',
            dataIndex: 'jurisdiction',
        },
        {
            title: '地域',
            dataIndex: 'area',
        },
        {
            title: '分组',
            dataIndex: 'group',
        },
        {
            title: '操作',
            dataIndex: 'img',
            render: (text, row) => {
                if (!text) {
                    return <span style={{ color: '#1890ff' }}>设置</span>
                }
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            const title = `姓名：${row.name} 状态：${
                                row.state === '是' ? '合规' : '违规'
                            }`
                            this.showModal(text, title)
                        }}
                    >
                        照片
                    </Button>
                )
            },
        },
    ]
    showModal = (imgsrc, imgTitle) => {
        this.setState({
            visible: true,
            imgLoading: true,
            imgsrc: '/img/' + imgsrc,
            imgTitle,
        })
    }

    imgLoad = () => {
        this.setState({
            imgLoading: false,
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
            imgsrc: '',
        })
    }
    selectChange = inputs => {
        inputs = (() => {
            const obj = {}
            for (let key in inputs) {
                if (inputs[key] !== undefined) {
                    if (key === 'startAt' && inputs[key]) {
                        const time = inputs[key]._d

                        obj[key] = new Date(
                            time.getFullYear(),
                            time.getMonth(),
                            time.getDate()
                        ).getTime()
                        continue
                    }
                    if (key === 'endAt' && inputs[key]) {
                        const time = inputs[key]._d
                        obj[key] =
                            new Date(
                                time.getFullYear(),
                                time.getMonth(),
                                time.getDate()
                            ).getTime() +
                            (3600000 * 24 - 1)
                        continue
                    }
                    obj[key] = inputs[key]
                }
            }
            return obj
        })()
        const newData = data.filter(val => {
            let is = true
            for (let key in inputs) {
                if (is === false) {
                    return false
                }
                if (key === 'startAt') {
                    if (!inputs[key]) {
                        continue
                    }
                    is = new Date(val.time).getTime() >= inputs[key]
                    continue
                }
                if (key === 'endAt') {
                    if (!inputs[key]) {
                        continue
                    }
                    is = new Date(val.time).getTime() < inputs[key]
                    continue
                }
                if (key === 'name') {
                    if (inputs[key] === '全部') {
                        continue
                    }
                    if (val[key] === '是') {
                        is = '合规' === inputs[key]
                        continue
                    }
                    if (val[key] === '否') {
                        is = '违规' === inputs[key]
                    }
                }
                if (key === 'jurisdiction') {
                    if (inputs[key] === '全部') {
                        continue
                    }
                    if (val[key] === '系统') {
                        is = '系统' === inputs[key]
                        continue
                    }
                    if (val[key] === '一般') {
                        is = '一般' === inputs[key]
                    }
                }
                if (key === 'group') {
                    if (inputs[key] === '全部') {
                        continue
                    }
                    if (val[key] === '高抛用户') {
                        is = '高抛用户' === inputs[key]
                        continue
                    }
                    if (val[key] === '河道监控') {
                        is = '河道监控' === inputs[key]
                        continue
                    }
                    if (val[key] === '设备检测') {
                        is = '设备检测' === inputs[key]
                        continue
                    }
                    if (val[key] === '安全及身份识别') {
                        is = '安全及身份识别' === inputs[key]
                        continue
                    }
                }
                is = val[key] === inputs[key] || inputs[key] === '全部';
            }
            return is
        })

        this.setState({ data: newData })
    }
    render() {
        return (
            <>
                <div className="HelmetTable-input">
                    <InputHeader
                        {...selectData}
                        selectInput={selectInput}
                        hide={true}
                        fn={this.selectChange}
                    />
                </div>
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={this.state.data}
                />
                <Modal
                    title={this.state.imgTitle}
                    width="300px"
                    centered
                    footer={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card
                        hoverable
                        loading={this.state.imgLoading}
                        style={{ width: '100%', height: '100%' }}
                        cover={
                            <img
                                onLoad={this.imgLoad}
                                alt="example"
                                style={{ objectFit: 'none' }}
                                src={this.state.imgsrc}
                            />
                        }
                    />
                </Modal>
            </>
        )
    }
}
