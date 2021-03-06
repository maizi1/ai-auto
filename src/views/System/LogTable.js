import React from 'react'
import { Table, Modal, Card } from 'antd'
import InputHeader from 'components/Header/InputHeader.js'
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
    return {}
})()

const selectInput = []

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
            dataIndex: 'auth',
        },
        {
            title: '分组',
            dataIndex: 'group',
        },
        {
            title: '操作',
            dataIndex: 'activity',
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
            }
            return is
        })

        this.setState({ data: newData })
    }
    render() {
        return (
            <>
                <div className="HelmetTable-input">
                    <InputHeader {...selectData} selectInput={selectInput} fn={this.selectChange} />
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
