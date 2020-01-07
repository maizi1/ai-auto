import React from 'react'
import { Modal, Spin } from 'antd'
import { Map, Marker } from 'react-amap'
import http from '../../axios/http-request'
import cookie from '../../util/cookie'

const { error } = Modal

export default class Amap extends React.Component {
    coordPool = []
    constructor() {
        super()
        this.toolEvents = {
            created: tool => {
                this.tool = tool
            },
        }
        this.state = {
            coord: { longitude: 104.123607, latitude: 30.620424 },
            visible: false,
            zoom: 4,
        }
        this.mapPlugins = ['ToolBar']
    }

    async componentDidMount() {
        this.getCoord(this.props.callback)
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible && this.props.visible === true) {
            if (this.props.defaultCoord) {
                this.setState({
                    coord: { longitude: 104.123607, latitude: 30.620424 },
                    visible: true,
                    zoom: 16,
                })
            } else {
                this.getCoord()
            }
        }
    }

    async getCoord(callback) {
        let appId = '9bf0504ca66543428d749ffcbb08114f'
        let accessToken = cookie.get('accessToken')
        let auth
        // let device
        // let deviceKey = cookie.get('deviceKey')
        // let projectId = cookie.get('projectId')
        if (!accessToken) {
            auth = await http.postAuth()
            if (auth) {
                accessToken = auth.data.data.accessToken
                cookie.set('accessToken', accessToken, +auth.data.data.expiresIn - 6)
            } else {
                error({ content: '用户鉴权失败' })
                return null
            }
        }

        // 设备key硬编码进下一步， 不在请求获取设备信息
        // if (!deviceKey && !projectId) {
        //     device = await http.postDevice({
        //         accessToken,
        //         appId,
        //         'Content-Type': 'application/json',
        //     })
        //     if (device) {
        //         const devices = device.data.data.devices
        //         deviceKey = devices[0].deviceKey
        //         projectId = devices[0].projectId
        //         cookie.set('deviceKey', deviceKey, 3600)
        //         cookie.set('projectId', projectId, 3600)
        //     } else {
        //         error({ content: '获取设备信息设备' })
        //         return null
        //     }
        // }
        let data
        // let data = await http.getDeviceDataHistory({
        //     appId,
        //     accessToken,
        //     deviceKey,
        //     projectId,
        // })
        const getData = async page => {
            let data = await http.getDeviceDataHistory(
                {
                    appId,
                    accessToken,
                    deviceKey: '157734237400095861',
                    projectId: '652190966953803776',
                },
                page
            )
            if (!data) {
                error({ content: '获取位置信息失败' })
                return
            }
            const { list, total } = data.data.data

            const coord = this.decode(list, total)
            if (coord !== null && !coord && page + 1 <= total / 10) {
                return await getData(page + 1)
            }
            return coord
        }
        if (!data) {
            data = await getData(1)
            if (!data) {
                return
            }
        }

        if (data && !callback) {
            if (this.convertFrom) {
                this.convertFrom(data, 'gps', this.convertFromCallback)
            } else {
                this.coordPool = [...data.coord]
            }
        }
        if (callback) {
            callback(data.time)
        }
        return data.time
    }

    convertFromCallback = (status, result) => {
        if (result.info === 'ok') {
            var lnglats = result.locations // Array.<LngLat>
            this.setState({
                coord: { longitude: lnglats[0].lng, latitude: lnglats[0].lat },
                visible: true,
                zoom: 16,
            })
        }
    }

    decode(dataList) {
        for (let i = 0, len = dataList.length; i < len; i++) {
            // 只获取5分钟内的数据
            // if (new Date(dataList[i].time).getTime() < Date.now() - 60000 * 5) {
            //     return null;
            // }
            let data = JSON.parse(dataList[i].content)
            if (data.service && data.service.data && data.service.data.datas) {
                // let datas = data.service.data.datas.substring(4)
                let datas = data.service.data.datas

                let coord = decode(datas)
                if (coord) {
                    return { coord: coord, time: dataList[i].time }
                }
            }
        }
        function decode(datas) {
            if (datas.length < 8) {
                return
            }
            let tag = datas.substring(0, 4)
            let len = Number('0x' + datas.substring(4, 8), 16)
            if (tag === '0008') {
                let gps = datas.substring(8, 8 + len * 2)
                if (gps.length >= 16) {
                    let x = gps.substring(0, 8)
                    let y = gps.substring(8, 16)
                    if (x.length === 8 && y.length === 8) {
                        let _x = x.split('')
                        let _y = y.split('')
                        x = [_x[6], _x[7], _x[4], _x[5], _x[2], _x[3], _x[0], _x[1]].join('')
                        y = [_y[6], _y[7], _y[4], _y[5], _y[2], _y[3], _y[0], _y[1]].join('')
                        x = Number('0x' + x, 16) / 1e6
                        y = Number('0x' + y, 16) / 1e6
                        return [x, y]
                    }
                }
            } else {
                return decode(datas.substring(8 + len * 2))
            }
        }
    }

    events = {
        created: instance => {
            this.convertFrom = window.AMap.convertFrom
            if (this.coordPool.length) {
                this.convertFrom(this.coordPool, 'gps', this.convertFromCallback)
            }
        },
    }

    render() {
        const { coord, visible, zoom } = this.state

        return (
            <Modal {...this.props}>
                <div style={{ width: '100%', height: 400 }}>
                    <Map
                        amapkey="f68f83101e60f33dbe58f33a88cdddb1"
                        plugins={this.mapPlugins}
                        events={this.events}
                        center={coord}
                        loading={
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 400,
                                }}
                            >
                                <Spin tip="地图加载中..."></Spin>
                            </div>
                        }
                        zoom={zoom}
                    >
                        <Marker position={coord} visible={visible} />
                    </Map>
                </div>
            </Modal>
        )
    }
}
