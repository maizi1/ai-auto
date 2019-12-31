import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/Header/Header.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import './Admin.css'

import HighTossActTable from 'views/HighTossAct/HighTossActTable.js'
import HighTossActAllData from 'views/HighTossAct/HighTossActAllData.js'
import WaterLevel from 'views/WaterLevel/WaterLevel.js'
import WaterLevelTable from 'views/WaterLevel/WaterLevelTable.js'
import HelmetTable from 'views/Helmet/HelmetTable.js'
import FacilityTable from 'views/Facility/FacilityTable.js'
import UserTable from 'views/User/UserTable.js'
import SystemLogQuery from 'views/System/LogTable.js'
import Database from 'views/System/Database.js'

const routes = [
    {
        sideName: '高空抛物',
        children: [
            {
                path: '/admin/HighTossActAllData',
                sideName: '统计数据',
            },
            {
                path: '/admin/HighTossActTable',
                sideName: '详细数据',
            },
        ],
    },
    {
        sideName: '水位监测',
        children: [
            {
                path: '/admin/WaterLevel',
                sideName: '统计数据',
            },
            {
                path: '/admin/WaterLevelTable',
                sideName: '详细数据',
            },
        ],
    },
    {
        sideName: '设备监测',
        children: [
            {
                path: '/admin/FacilityTable',
                sideName: '统计数据',
            },
        ],
    },
    {
        sideName: '安全帽监测',
        children: [
            {
                path: '/admin/HelmetTable',
                sideName: '统计数据',
            },
        ],
    },
    {
        sideName: '系统管理',
        children: [
            {
                path: '/admin/UserTable',
                sideName: '用户管理',
            },
            {
                path: '/admin/SystemLogQuery',
                sideName: '日志查询',
            },
            {
                path: '/admin/SystemDatabase',
                sideName: '数据库管理',
            },
        ],
    },
]

const paths = routes.reduce((arr, next, index) => {
    if (next.path) {
        arr.push([`${index + 1}-0`, next.path, next.sideName])
        return arr
    }
    next.children.forEach((obj, i) => {
        arr.push([`${index + 1}-${i}`, obj.path, next.sideName])
    })
    return arr
}, [])

const getKeyAndTitle = pathname => {
    for (let i = paths.length - 1; i >= 0; i--) {
        if (paths[i][1] === pathname) {
            return {
                openKey: paths[i][0].split('-')[0],
                itemKey: paths[i][0],
                title: paths[i][2],
            }
        }
    }
    return {
        openKey: '',
        itemKey: '',
        title: '',
    }
}
function Admin({ location }) {
    const { pathname } = location
    const keyAndTitle = getKeyAndTitle(pathname)

    return (
        <div className="Admin">
            <Header title={keyAndTitle.title} pathname={pathname} />
            <Sidebar path={routes} menuKey={keyAndTitle} />
            <main className="main">
                <Switch>
                    <Route
                        path="/admin/HighTossActAllData"
                        render={props => <HighTossActAllData {...props} />}
                    />
                    <Route
                        path="/admin/HighTossActTable"
                        render={props => <HighTossActTable {...props} />}
                    />
                    <Route path="/admin/WaterLevel" render={props => <WaterLevel {...props} />} />
                    <Route
                        path="/admin/WaterLevelTable"
                        render={props => <WaterLevelTable {...props} />}
                    />
                    <Route path="/admin/HelmetTable" render={props => <HelmetTable {...props} />} />
                    <Route
                        path="/admin/FacilityTable"
                        render={props => <FacilityTable {...props} />}
                    />
                    <Route path="/admin/SystemDatabase" render={props => <Database {...props} />} />
                    <Route
                        path="/admin/SystemLogQuery"
                        render={props => <SystemLogQuery {...props} />}
                    />
                    <Route path="/admin/UserTable" render={props => <UserTable {...props} />} />
                </Switch>
            </main>
        </div>
    )
}

export default Admin
