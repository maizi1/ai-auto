import React from 'react'
import { Table, Tag, Modal, Card, Button } from 'antd'
import InputHeader from 'components/Header/InputHeader.js'

import data from './Data.js'

const selectData = (() => {
    const obj = {
        area: { 全部: '' },
        point: { 全部: '' },
        river: { 全部: '' },
    }
    data.forEach(val => {
        for (let key in obj) {
            obj[key][val[key]] = ''
        }
    })
    obj.warn = {
        全部: '',
        安全: '',
        偏低预警: '',
        超高预警: '',
    }
    return obj
})()

const selectInput = [
    { label: '区域', key: 'area' },
    { label: '河道', key: 'river' },
    { label: '监测点', key: 'point' },
    { label: '警戒级别', key: 'warn' },
]

export default class HighTossActTable extends React.Component {
    state = { data, imgsrc: '', visible: false, imgTitle: '', imgLoading: false }
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '时间',
            dataIndex: 'time',
        },
        {
            title: '区域',
            dataIndex: 'area',
            render: text => text + '区',
        },
        {
            title: '河道',
            dataIndex: 'river',
            render: text => text + '河段',
        },
        {
            title: '监测点',
            dataIndex: 'point',
            render: text => text,
        },
        {
            title: '水位',
            dataIndex: 'value',
        },
        {
            title: '告警状态',
            render: ({ value }) => {
                if (value === '低') {
                    return <Tag color="lime">偏低预警</Tag>
                }
                if (value === '中') {
                    return <Tag color="cyan">安全</Tag>
                }
                if (value === '高') {
                    return <Tag color="#ffab00">超高预警</Tag>
                }
            },
        },
        {
            title: '图片',
            dataIndex: 'img',
            render: (text, row) => {
                if (!text) {
                    return ''
                }
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            const title = `${row.area}区域  ${row.river}河道  ${row.point}号监测点`
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
                if (key === 'warn') {
                    if (inputs[key] === '安全') {
                        is = val.value === '中'
                        continue
                    }
                    if (inputs[key] === '偏低预警') {
                        is = val.value === '低'
                        continue
                    }
                    if (inputs[key] === '超高预警') {
                        is = val.value === '高'
                        continue
                    }
                    continue
                }
                is = val[key] === inputs[key] || inputs[key] === '全部'
            }
            return is
        })

        this.setState({ data: newData })
    }
    render() {
        return (
            <>
                <InputHeader
                    {...selectData}
                    selectInput={selectInput}
                    fn={this.selectChange}
                />
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={this.state.data}
                />
                <Modal
                    title={this.state.imgTitle}
                    width="600px"
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
                                style={{width: '100%'}}
                                alt="example"
                                src={this.state.imgsrc}
                            />
                        }
                    />
                </Modal>
            </>
        )
    }
}
