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

const isPath = (pathname) => {
    if (pathname.match('HighTossAct')) {
        return {
            title: '高空抛物统计数据',
            path: [
                {
                    url: '/admin/HighTossActAllData',
                    sideName: '统计数据',
                },
                {
                    url: '/admin/HighTossActTable',
                    sideName: '详细数据',
                }
            ]
        }
    }
    if (pathname.match('WaterLevel')) {
        return {
            title: '水位监测统计数据',
            path: [
                {
                    url: '/admin/WaterLevel',
                    sideName: '统计数据',
                },
                {
                    url: '/admin/WaterLevelTable',
                    sideName: '详细数据',
                }
            ]
        }
    }
    if (pathname.match('Helmet')) {
        return {
            title: '安全帽监测数据',
            path: [
                {
                    url: '/admin/HelmetTable',
                    sideName: '统计数据',
                },
            ]
        }
    }
    if (pathname.match('FacilityTable')) {
        return {
            title: '设备监测数据',
            path: [
                {
                    url: '/admin/FacilityTable',
                    sideName: '统计数据',
                },
            ]
        }
    }
}
function Admin ({ location }) {
    const { pathname } = location
    let paths = isPath(pathname)
    return (
        <div className="Admin">
            <Header title={paths.title} />
            <Sidebar path={paths.path} pathname={pathname} />
            <main className="main">
            <Switch>
                    <Route path="/admin/HighTossActAllData" render={props => <HighTossActAllData {...props} />} />
                    <Route path="/admin/HighTossActTable" render={props => <HighTossActTable {...props} />} />
                    <Route path="/admin/WaterLevel" render={props => <WaterLevel {...props} />} />
                    <Route path="/admin/WaterLevelTable" render={props => <WaterLevelTable {...props} />} />
                    <Route path="/admin/HelmetTable" render={props => <HelmetTable {...props} />} />
                    <Route path="/admin/FacilityTable" render={props => <FacilityTable {...props} />} />
            </Switch>
            </main>

        </div>
    )
}

export default Admin
