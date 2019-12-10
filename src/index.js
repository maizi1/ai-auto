import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import 'assets/css/index.css'
import * as serviceWorker from 'serviceWorker'
import AdminLayout from 'layouts/Admin/Admin.js'
import Home from 'views/Home/Home.js'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => <Component {...props} />} />
)

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/admin" component={AdminLayout} />
                <Route path="/" render={props => <Home {...props} />} />
            </Switch>
        </BrowserRouter>
    </ConfigProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
