import React from 'react'
import { Modal, Spin, Alert } from 'antd'
import { Map, Marker } from 'react-amap'
import http from '../../axios/http-request'
import cookie from '../../util/cookie'

const { error } = Modal

export default class Amap extends React.Component {
    constructor() {
        super()
        this.toolEvents = {
            created: tool => {
                this.tool = tool
            },
        }
        this.mapPlugins = ['ToolBar']
        this.mapCenter = { longitude: 120, latitude: 35 };
        console.log(this.mapCenter)
        this.markerPosition = { longitude: 90, latitude: 35 }
    }

    getLocation(number) {
        console.log(number.slice(0, 10))
        const e = +number.slice(0, 10)
        const n = +number.slice(10, 20)
        return {
            longitude: +(Math.floor(e / 30000 / 60) + '.' + e / 30000 % 60),
            latitude: +(Math.floor(n / 30000 / 60) + '.' + n / 30000 % 60)
        }
    }

    componentDidMount() {
        this.getCoord()
    }

    async getCoord() {
        let appId = '9bf0504ca66543428d749ffcbb08114f'
        let accessToken = cookie.get('accessToken')
        let auth
        let device
        let deviceKey = cookie.get('deviceKey')
        let projectId = cookie.get('projectId')
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

        if (!deviceKey && !projectId) {
            device = await http.postDevice({
                accessToken,
                appId,
                'Content-Type': 'application/json',
            })
            if (device) {
                const devices = device.data.data.devices
                deviceKey = devices[0].deviceKey
                projectId = devices[0].projectId
                cookie.set('deviceKey', deviceKey, 3600)
                cookie.set('projectId', projectId, 3600)
            } else {
                error({ content: '获取设备信息设备' })
                return null
            }
        }

        let data = await http.getDeviceDataHistory({
            appId,
            accessToken,
            deviceKey,
            projectId,
        })
        if (!data) {
            data = await http.getDeviceDataHistory({
                appId,
                accessToken,
                deviceKey,
                projectId: '652190966953803776',
            })
        }
        if (!data) {
            error({ content: '获取位置信息失败' })
        }
        return data
    }

    render() {
        return (
            <Modal {...this.props}>
                <div style={{ width: '100%', height: 400 }}>
                    <Map
                        amapkey="f68f83101e60f33dbe58f33a88cdddb1"
                        plugins={this.mapPlugins}
                        center={this.mapCenter}
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
                        zoom={16}
                    >
                        <Marker position={this.markerPosition} />
                    </Map>
                </div>
            </Modal>
        )
    }
}
