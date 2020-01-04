import React from 'react'
import { Table, Tag, Modal, Card, Button } from 'antd';
import InputHeader from 'components/Header/InputHeader.js'
import './HelmetTable.css'
import data from './Data.js'

const selectData = (() => {
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
            title: '安全帽颜色',
            dataIndex: 'color',
            render: text => {
                return text.split(' ').map(color => {
                    return (<i className="HelmetTable-icon">
                        <svg t="1578131299426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15713" width="28" height="28"><path d="M973.123 699.463H948.15c-6.796-235.054-199.454-423.519-436.149-423.519-236.697 0-429.355 188.464-436.151 423.519H50.877c-22.906 0-41.66 18.74-41.66 41.654v13.884c0 22.912 18.754 41.66 41.66 41.66h922.246c22.913 0 41.66-18.748 41.66-41.66v-13.884c0-22.914-18.747-41.654-41.66-41.654z" p-id="15714"></path><path d="M512.964 498.115a13933.829 13933.829 0 0 0-57.859-118.028c-26.411-53.211-34.742-69.08-29.468-90.255 8.204-32.901 45.351-63.009 87.947-62.486 37.166 0.456 71.135 24.202 85.629 60.172a1071.216 1071.216 0 0 1-86.249 210.597zM654.129 549.035c17.32-27.849 43.257-62.963 81-97.202a455.052 455.052 0 0 1 71.743-53.227c3.2-0.815 46.75-11.102 78.69 18.513 26.57 24.64 33.665 66.291 16.191 101.829-23.444-5.363-52.432-9.608-85.627-9.256-72.095 0.764-128.61 22.84-161.997 39.343zM365.148 549.031c-17.314-27.848-43.258-62.965-80.999-97.201a455.695 455.695 0 0 0-71.743-53.227c-3.201-0.814-46.75-11.101-78.685 18.512-26.577 24.641-33.665 66.291-16.205 101.83 23.451-5.363 52.432-9.612 85.628-9.256 72.103 0.764 128.611 22.84 162.004 39.342z" p-id="15715"></path><path d="M935.604 699.463H88.397c-10.544 0-19.179-8.636-19.179-19.185v-24.12c0-10.55 8.635-19.183 19.179-19.183h847.207c10.55 0 19.178 8.633 19.178 19.183v24.12c-0.001 10.549-8.628 19.185-19.178 19.185z" p-id="15716"></path><path d="M603.942 668.22c0 54.333-44.037 98.37-98.37 98.37-54.334 0-98.377-44.037-98.377-98.37 0-54.33 44.043-98.378 98.377-98.378 54.333 0 98.37 44.048 98.37 98.378z" p-id="15717"></path><path d="M576.155 668.22c0 38.984-31.604 70.589-70.583 70.589-38.991 0-70.59-31.604-70.59-70.589s31.599-70.586 70.59-70.586c38.978 0 70.583 31.601 70.583 70.586z" p-id="15718"></path></svg>
                        {text === 'none' && <svg t="1578131764235" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16776" width="32" height="32"><path d="M926.3 337.9c-22.6-53.3-54.8-101.2-96-142.3-41.1-41.1-89-73.4-142.3-96-55.2-23.4-113.9-35.2-174.3-35.2S394.6 76.2 339.3 99.6c-53.3 22.6-101.2 54.8-142.3 96-41.1 41.1-73.4 89-96 142.3-23.4 55.2-35.2 113.9-35.2 174.3 0 60.4 11.8 119.1 35.2 174.3 22.6 53.3 54.8 101.2 96 142.3 41.1 41.1 89 73.4 142.3 96 55.2 23.4 113.9 35.2 174.3 35.2s119.1-11.8 174.3-35.2c53.3-22.6 101.2-54.8 142.3-96 41.1-41.1 73.4-89 96-142.3 23.4-55.2 35.2-113.9 35.2-174.3 0.1-60.4-11.8-119.1-35.1-174.3zM513.7 879.1c-202.3 0-366.9-164.6-366.9-366.9 0-86.2 29.9-165.5 79.7-228.1l515.3 515.3c-62.7 49.9-142 79.7-228.1 79.7z m284.9-136L282.8 227.2c63.1-51.2 143.5-81.9 230.9-81.9 202.3 0 366.9 164.6 366.9 366.9 0 87.4-30.7 167.8-82 230.9z" p-id="16777" fill="#d81e06"></path></svg>}
                    </i>)
                })
            }
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