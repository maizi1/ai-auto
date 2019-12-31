import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Button } from 'antd'
import './Header.css'

function Header ({ title, pathname }) {
    return (
        <div className="Header">
            <Link style={{fontSize: 40, padding: '0 30px', color: '#fff'}} to="/"><Icon type="home" /></Link>
            <p className="title">{title}</p>
            {(pathname === '/admin/UserTable') && <Button type="primary" icon="plus">添加</Button>}
            {(pathname === '/admin/HelmetTable') && <Button type="primary" icon="plus"><a href="vysor://" style={{color: '#fff'}}>检测</a></Button>}
        </div>
    )
}

export default Header
