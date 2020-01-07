import React from 'react'
import { Table, Modal, Card, Button, Icon } from 'antd'
import InputHeader from 'components/Header/InputHeader.js'
import Amap from 'components/Amap/Amap.js'

import data from './Data.js'

const selectData = (() => {
    const obj = {
        area: { 全部: '' },
        building: { 全部: '' },
        room: { 全部: '' },
        cell: { 全部: '' },
    }
    data.forEach(val => {
        for (let key in obj) {
            obj[key][val[key]] = ''
        }
    })
    return obj
})()

const selectInput = [
    { label: '区域', key: 'area' },
    { label: '栋', key: 'building' },
    { label: '层', key: 'cell' },
]

export default class HighTossActTable extends React.Component {
    state = {
        data,
        imgsrc: '',
        visible: false,
        imgTitle: '',
        amapVisible: false,
        defaultCoord: false,
    }
    id = 1
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: () => {
                return this.id++
            },
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '区域',
            dataIndex: 'area',
            key: 'area',
        },
        {
            title: '楼栋',
            key: 'building',
            dataIndex: 'building',
        },
        {
            title: '楼层',
            key: 'room',
            dataIndex: 'room',
        },
        {
            title: '操作',
            dataIndex: 'video',
            align: 'center',
            render: (text, row) => {
                return (
                    <>
                        <Button type="link" ghost onClick={() => this.showAmap(row.id)}>
                            <Icon
                                type="environment"
                                theme="twoTone"
                                style={{
                                    fontSize: 22,
                                    verticalAlign: 'text-top',
                                }}
                            />
                        </Button>
                        <Button
                            type="primary"
                            style={{ marginLeft: 18 }}
                            disabled={!text}
                            onClick={() => {
                                const title = `${row.area}  ${row.building}  3单元  ${row.room}`
                                this.showModal(text, title)
                            }}
                        >
                            视频
                        </Button>
                    </>
                )
            },
        },
    ]
    showAmap = (id) => {
        this.setState({ amapVisible: true, defaultCoord: id !== 17 ? true : false })
    }
    CancelAmap = () => {
        this.setState({ amapVisible: false })
    }
    showModal = (imgsrc, imgTitle) => {
        this.setState({
            visible: true,
            imgsrc,
            imgTitle,
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        })
    }

    getGpsTime = time => {
        function format(fmt, time) {
            const date = new Date(time)
            var o = {
                'M+': date.getMonth() + 1, //月份
                'd+': date.getDate(), //日
                'h+': date.getHours(), //小时
                'm+': date.getMinutes(), //分
                's+': date.getSeconds(), //秒
                'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds(), //毫秒
            }

            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }

            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                    )
                }
            }

            return fmt
        }
        const data = this.state.data
        data[0].time = format('M/d/yyyy hh:mm', time)
        this.setState(data)
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

                is = val[key] === inputs[key] || inputs[key] === '全部'
            }
            return is
        })

        this.setState({ data: newData })
    }
    render() {
        return (
            <>
                <InputHeader {...selectData} selectInput={selectInput} fn={this.selectChange} />
                <Table
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={this.state.data}
                />
                <Modal
                    title={this.state.imgTitle}
                    width="600px"
                    centered
                    destroyOnClose={true}
                    footer={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Card
                        hoverable
                        style={{ width: 'auto', height: '100%' }}
                        cover={
                            <video alt="example" controls>
                                <source src={'/img/' + this.state.imgsrc} type="video/mp4"></source>
                            </video>
                        }
                    />
                </Modal>
                <Amap
                    title="位置"
                    visible={this.state.amapVisible}
                    centered
                    footer={null}
                    onCancel={this.CancelAmap}
                    callback={this.getGpsTime}
                    defaultCoord={this.state.defaultCoord}
                />
            </>
        )
    }
}
