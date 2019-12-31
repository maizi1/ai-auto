import React from 'react'
import { Table, Tag, Modal, Card, Button } from 'antd';
import InputHeader from 'components/Header/InputHeader.js'
import './HelmetTable.css'
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
            '合规': '',
            '违规': '',
    }}
})()

const selectInput = [
    { label: '状态', key: 'state' },
]

export default class HelmetTable extends React.Component {
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
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (text) => {
                if (text === '是') {
                    return <Tag color="cyan">合规</Tag>
                }
                return <Tag color="magenta">违规</Tag>
            }
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
                            const title = `身份：${row.name} 状态：${row.state === '是' ? '合规' : '违规'}`
                            this.showModal(text, title)
                        }}
                    >
                        照片
                    </Button>
                )
            },
        },
    ]; 
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
    selectChange = (inputs) => {
        inputs = (() => {
            const obj = {}
            for (let key in inputs) {
                if (inputs[key] !== undefined) {
                    if (key === 'startAt' && inputs[key]) {
                        const time = inputs[key]._d

                        obj[key] = new Date(time.getFullYear(), time.getMonth(), time.getDate()).getTime()
                        continue
                    }
                    if (key === 'endAt' && inputs[key]) {
                        const time = inputs[key]._d
                        obj[key] = new Date(time.getFullYear(), time.getMonth(), time.getDate()).getTime() + (3600000*24-1)
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
                if (key === 'state') {
                    if (inputs[key] === '全部') {
                        continue
                    }
                    if (val[key] === '是') {
                        is = ('合规' === inputs[key])
                        continue
                    }
                    if (val[key] === '否') {
                        is =  ('违规' === inputs[key])
                    }
                }
            }
            return is
        })

        this.setState({data: newData})

    }
    render () {
        return (
            <>
                <div className="HelmetTable-input">
                <InputHeader
                    {...selectData}
                    selectInput={selectInput}
                    fn={this.selectChange} />
                </div>
                <Table rowKey={record => record.id} columns={this.columns} dataSource={this.state.data} />
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
                                style={{objectFit: 'cover'}}
                                src={this.state.imgsrc}
                            />
                        }
                    />
                </Modal>
            </>
        )
    }
}