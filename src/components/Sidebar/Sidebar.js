import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import './Sidebar.css'

const { SubMenu } = Menu

export default class Sidebar extends React.Component {
    style = {
        width: 180,
        position: 'fixed',
        left: 12,
        top: 99,
        bottom: 10,
        overflowY: 'auto',
        overflowX: 'hidden'
    }
    render() {
        const { path, menuKey } = this.props
        const { openKey, itemKey } = menuKey
        return (
            <Menu
                style={this.style}
                defaultSelectedKeys={[itemKey]}
                defaultOpenKeys={[openKey]}
                mode="inline"
            >
                {path.map((route, index) =>
                    route.path ? (
                        <Menu.Item key={`${index + 1}-0`}>
                            <Link to={route.path} className="list-icon">
                                {route.sideName}
                            </Link>
                        </Menu.Item>
                    ) : (
                        <SubMenu key={`${index + 1}`} title={<span>{route.sideName}</span>}>
                            {route.children.map((route, k) => (
                                <Menu.Item key={`${index + 1}-${k}`}>
                                    <Link to={route.path} className="list-icon">
                                        {route.sideName}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    )
                )}
            </Menu>
        )
    }
}
