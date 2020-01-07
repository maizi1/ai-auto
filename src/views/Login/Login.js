import React from 'react'
import { Button, message} from 'antd'
import cookie from 'util/cookie'
import './Login.css'

export default class Login extends React.Component {
    state = {
        user: '',
        pwd: '',
        loading: false,
        loadingTex: '登录',
    }

    handleInputChange = event => {
        const target = event.target
        const { value, id } = target
        this.setState({
            [id]: value,
        })
    }

    onLogin = event => {
        event.preventDefault()
        const {user, pwd} = this.state;
        if (user !== 'niyuanjie' || pwd !==  'niyj@znsbxt135') {
            this.setState({ loading: true, loadingTex: '登录中' })
            window.setTimeout(() => {
                message.info('账号或密码不正确')
                this.setState({ loading: false, loadingTex: '登录' })
            }, 800)
            return
        }
        this.setState({ loading: true, loadingTex: '登录中' })
        const { history, location } = this.props
        const pathname = location.state ? (location.state.from ? location.state.from.pathname : '/') : '/'
        window.setTimeout(() => {
            cookie.set(
                'uslgaccessToken',
                Math.random()
                    .toString(36)
                    .substr(2),
                3600
            )
            history.push(pathname)
        }, 800)
    }
    render() {
        const { user, pwd, loading, loadingTex } = this.state
        return (
            <div className="Login">
                <div className="Login-left">
                    <h1 className="Login-left-title">基于机器视觉学习算法的智能识别系统</h1>
                </div>
                <div className="Login-right">
                    <p className="Login-right-title">登录</p>
                    <form className="Login-from" onSubmit={this.onLogin}>
                        <label htmlFor="user">用户名</label>
                        <input
                            id="user"
                            type="input"
                            style={{ marginBottom: 20 }}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="pwd">密码</label>
                        <input
                            id="pwd"
                            name="pwd"
                            type="password"
                            onChange={this.handleInputChange}
                        />
                        <Button
                            disabled={!pwd || !user}
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                height: 40,
                                marginTop: 50,
                                color: '#fff',
                                borderColor: '#1890ff',
                                background: '#1890ff',
                            }}
                        >
                            {loadingTex}
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}
