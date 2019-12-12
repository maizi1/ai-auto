import React from 'react'
import { Table, Tag,Modal, Card, Button } from 'antd'
import InputHeader from 'components/Header/InputHeader.js'
import './FacilityTable.css'
import data from './Data.js'

const selectData = (() => {
    // const obj = {
    //     area: {'全部':''},
    //     point: {'全部':''},
    //     river: {'全部':''},
    // }
    // data.forEach(val => {
    //     for (let key in obj) {
    //         obj[key][val[key]] = ''
    //     }
    // })
    // obj.warn = {
    //     '全部': '',
    //     '枯水': '',
    //     '少量': '',
    //     '橙色警戒': '',
    //     '红色警戒': '',
    //     '溢出': '',
    // }
    return {
        state: {
            '全部': '',
            '未检测': '',
            '已检测异常': '',
            '已检测正常': '',
        },
    }
})()

const selectInput = [{ label: '状态', key: 'state' }]

export default class HelmetTable extends React.Component {
    state = { data, imgsrc: '', visible: false, imgTitle: '', imgLoading: false }
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '设备',
            dataIndex: 'facility',
            render: text => text + '号设备'
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: text => {
                if (text === '已检测正常') {
                    return <Tag color="cyan">已检测正常</Tag>
                }
                if (text === '已检测异常') {
                    return <Tag color="magenta">已检测异常</Tag>
                }
                return <Tag color="lime">未检测</Tag>
            },
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '时间',
            dataIndex: 'time',
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
                            const title = `${row.facility}号设备${row.state}  检测人：${row.name ? row.name : ''}`
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
        inputs = ((obj) => {
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
        })({})
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
                if (key === 'state') {
                    if (inputs[key] === '全部') {
                        continue
                    }
                    is = val[key] === inputs[key]
                    continue
                }
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
                                alt="example"
                                style={{width: '100%'}}
                                src={this.state.imgsrc}
                            />
                        }
                    />
                </Modal>
            </>
        )
    }
}
