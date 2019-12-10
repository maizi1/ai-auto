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
        枯水: '',
        少量: '',
        橙色警戒: '',
        红色警戒: '',
        溢出: '',
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
            render: text => text + '号检测点',
        },
        {
            title: '水位',
            dataIndex: 'value',
        },
        {
            title: '警戒级别',
            render: ({ value }) => {
                if (value <= 100) {
                    return <Tag color="lime">枯水</Tag>
                }
                if (value <= 150 && value > 100) {
                    return <Tag color="cyan">少量</Tag>
                }
                if (value <= 200 && value > 150) {
                    return <Tag color="#ffab00">橙色警戒</Tag>
                }
                if (value <= 250 && value > 200) {
                    return <Tag color="#ff0000">红色警戒</Tag>
                }
                return <Tag color="magenta">溢出</Tag>
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
                        is = true
                        continue
                    }
                    is = new Date(val.time).getTime() >= inputs[key]
                    continue
                }
                if (key === 'endAt') {
                    if (!inputs[key]) {
                        is = true
                        continue
                    }
                    is = new Date(val.time).getTime() < inputs[key]
                    continue
                }
                if (key === 'warn') {
                    if (inputs[key] === '枯水') {
                        is = val.value <= 100
                        continue
                    }
                    if (inputs[key] === '少量') {
                        is = val.value <= 150 && val.value > 100
                        continue
                    }
                    if (inputs[key] === '橙色警戒') {
                        is = val.value <= 200 && val.value > 150
                        continue
                    }
                    if (inputs[key] === '红色警戒') {
                        is = val.value <= 250 && val.value > 200
                        continue
                    }
                    if (inputs[key] === '溢出') {
                        is = val.value > 250
                        continue
                    }
                    is = true
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
