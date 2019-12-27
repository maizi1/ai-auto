import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Header from 'components/Header/DataHeader.js'
import './HighTossActAllData.css'

import { chartOptions, parseOptions, chartExample2 } from 'variables/charts.jsx'
import data from './Data.js'

const capsNumber = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
]
const DAY = 1000 * 3600 * 24;
const date = new Date();
const yyMMdd = {
    yy: date.getFullYear(),
    MM: date.getMonth(),
    dd: date.getDate()
}

const buildingResult = (function () {
    const obj = {}
    let arr = []
    data.forEach((val, index) => {
        const { building } = val
        if (obj[building] === undefined) {
            obj[building] = {
                thisWeek: 0,
                lastWeek: 0,
                data: [],
            }

        }
        obj[building].data.push(data[index].time);
    })

    const hebdomad = new Date(yyMMdd.yy, yyMMdd.MM, yyMMdd.dd, 23, 59, 59, 999).getTime()
    const whatDay = date.getDay() === 0 ? 7 : date.getDay()
    for (const key in obj) {
        obj[key].key = key
        obj[key].data.forEach(val => {
            const time = new Date(val).getTime()
            if (time < hebdomad && time > hebdomad - (DAY * whatDay)) {
                obj[key].thisWeek += 1
            } else if (time <= hebdomad - (DAY * whatDay) && time > hebdomad - (DAY * (whatDay + 7))) {
                obj[key].lastWeek += 1
            }
        })
        arr.push(obj[key])
    }
    arr = arr.filter((val) => {
        return val.thisWeek !== 0
    })
    return arr.sort((a, b) => {
        return b.thisWeek - a.thisWeek
    })
})()
const barData = {
    month: () => ({
        labels: Array.from({ length: 12 }, (x, y) => {
            let month = yyMMdd.MM + y + 1;
            if (month >= 12) {
                month = month - 12;
            }
            return capsNumber[month] + '月'
        }),
        datasets: [
            {
                label: '抛物',
                backgroundColor: '#744dfe',
                data: (function () {
                    const arr = Array.from({ length: 12 }, x => 0)
                    data.forEach(val => {
                        const month = new Date(val.time).getMonth()
                        arr[month] += 1
                    })
                    return arr
                })(),
            },
        ],
    }),
    quarter: () => ({
        labels: Array.from(
            { length: 4 },
            (x, y) => '第' + capsNumber[y] + '季度'
        ),
        datasets: [
            {
                label: '抛物',
                backgroundColor: '#744dfe',
                borderSkipped: 'bottom',
                data: (function () {
                    const arr = Array.from({ length: 4 }, x => 0)
                    data.forEach(val => {
                        const quarter = Math.floor(new Date(val.time).getMonth() / 3)
                        arr[quarter] += 1
                    })
                    return arr
                })(),
            },
        ],
    }),
}
export default class HighTossActAllData extends React.Component {
    state = {
        barDataView: 'month',
        warning: buildingResult[0]
    }
    statistics = (function () {
        const obj = {
            yy: 0,
            mm: 0,
            dd: 0,
            M: 0,
        }
        const date = new Date(2020,1,20)
        const hebdomad = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime()
        const yy = date.getFullYear()
        const mm = date.getMonth()
        const dd = date.getDate()
        const M = date.getDay() === 0 ? 7 : date.getDay()
        data.forEach(({ time }) => {
            let _time = new Date(time)
            let ms = _time.getTime()
            if (_time.getFullYear() === yy) {
                obj.yy++
            }
            if (_time.getMonth() === mm) {
                obj.mm++
            }
            if (_time.getDate() === dd) {
                obj.dd++
            }
            if (ms < hebdomad && ms > hebdomad - (DAY * M)) {
                obj.M++
            }
        })
        return obj
    })()
    componentWillMount () {
        if (window.Chart) {
            parseOptions(Chart, chartOptions())
        }
    }

    toggleBarDataView = (viewName) => {
        if (viewName === this.state.barDataView) return
        this.setState({
            barDataView: viewName
        })
    }
    render () {
        let { warning } = this.state
        if (typeof warning !== 'object') {
            warning = {
                key: '',
                thisWeek: 0,
            }
        }
        return (
            <>
                <Header {...this.statistics} />
                <Row
                    type="flex"
                    gutter={30}
                    style={{
                        margin: '80px -15px 0 -15px',
                        color: '#364064',
                        fontSize: 16,
                    }}
                >
                    <Col span={12}>
                        <div className="Bar-card">
                            <div
                                className="f-clear"
                                style={{
                                    padding: '20px 25px 20px 35px',
                                    lineHeight: '32px',
                                }}
                            >
                                <span>数据趋势变化图</span>
                                <div style={{ float: 'right' }}>
                                    <Button
                                        className={
                                            this.state.barDataView === 'month'
                                                ? 'Bar-card-btn activity'
                                                : 'Bar-card-btn'
                                        }
                                        style={{ marginRight: 12 }}
                                        onClick={() => this.toggleBarDataView('month')}
                                    >
                                        按月份
                                    </Button>
                                    <Button
                                        className={
                                            this.state.barDataView === 'quarter'
                                                ? 'Bar-card-btn activity'
                                                : 'Bar-card-btn'
                                        }
                                        onClick={() => this.toggleBarDataView('quarter')}
                                    >
                                        按季度
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Bar
                                    data={barData[this.state.barDataView]}
                                    options={chartExample2.options}
                                    height={250}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="Bar-card" style={{overflow: 'hidden'}}>
                            <div
                                className="f-clear"
                                style={{
                                    padding: '20px 25px 20px 35px',
                                    lineHeight: '32px',
                                }}
                            >
                                <span>本周统计数据</span>
                            </div>
                            <div className="hebdomad" style={{ padding: '20px 0' }}>
                                {buildingResult.map((obj, index) => {
                                    const { thisWeek, lastWeek } = obj
                                    let arrow, color
                                    if (thisWeek - lastWeek > 0) {
                                        arrow = 'arrow-up'
                                        color = '#2dcc6c'
                                    } else {
                                        arrow = 'arrow-down'
                                        color = '#edb9bb'
                                    }
                                    return (
                                        <div key={index}
                                            className="all-data-shadow"
                                        >
                                            <span>{obj.key}</span>
                                            <div style={{ float: 'right' }}>
                                                <span style={{ marginRight: 50 }}>
                                                    {thisWeek}
                                                </span>
                                                <Icon
                                                    type={arrow}
                                                    style={{
                                                        color,
                                                        fontSize: 22,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                </Row>
                <p className="warn-message" style={{display: warning.thisWeek === 0 ? 'none' : 'block'}}>{warning.key}本周抛物{warning.thisWeek}次！</p>
            </>
        )
    }
}
