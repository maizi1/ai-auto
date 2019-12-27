import React from 'react'
import { Icon } from 'antd'

export default class HelmetTable extends React.Component {

    render() {
        return (
            <div style={{width: '100%', height: 'calc(100% - 10px)', background: '#fff',padding: '20px 50px', boxSize: 'border-box', fontSize: 26}}>
                <p>数据库数据增加 <Icon type="arrow-right" style={{color: '#52c41a', marginLeft: 16}} /></p>
                <p>数据库数据删除 <Icon type="arrow-right" style={{color: '#52c41a', marginLeft: 16}} /></p>
                <p>数据库数据还原 <Icon type="arrow-right" style={{color: '#52c41a', marginLeft: 16}} /></p>
            </div>
        )
    }
}
