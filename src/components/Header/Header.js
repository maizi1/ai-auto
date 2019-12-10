import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import './Header.css'

function Header ({ title }) {
    return (
        <div className="Header">
            <Link style={{fontSize: 40, padding: '0 30px', color: '#fff'}} to="/"><Icon type="home" /></Link>
            <p className="title">{title}</p>
        </div>
    )
}

export default Header
