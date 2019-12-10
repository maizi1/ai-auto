import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import './Sidebar.css'

export default class Sidebar extends React.Component {
    render () {
        const { path, pathname } = this.props
        const foucs = pathname === path[0].url ? "1" : "2"
        return (
            <Menu
                style={{ width: 180, position: 'fixed', left: 12, top: 99, bottom: 10, }}
                defaultSelectedKeys={foucs}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {path.map((val, index) => <Menu.Item key={`${ index + 1 }`}><Link to={val.url} className="list-icon">{val.sideName}</Link></Menu.Item>)}
            </Menu>
        )
    }
}
