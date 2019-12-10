import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import Chart from 'chart.js'
import { Bar } from 'react-chartjs-2'
import Header from 'components/Header/DataHeader.js'
import './WaterLevel.css'

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
const buildingResult = (function() {
    const obj = {}
    let arr = []
    data.forEach((val, index) => {
        const { point } = val
        if (obj[point] === undefined) {
            obj[point] = {
                thisWeek: 0,
                lastWeek: 0,
                lastWeekTime: 0,
                isStart: false,
                isLastStart: false,
                data: [],
            }
        }
        if (data[index].value > 150) {
            obj[point].data.push(data[index].time)
        }
    })

    const date = new Date()
    const hebdomad = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
        999
    ).getTime()

    for (const key in obj) {
        obj[key].key = key
        obj[key].data = obj[key].data.reverse()
        obj[key].data.forEach(val => {
            const date = new Date(val)
            const time = date.getTime()
            console.log(val)
            if (
                time < hebdomad - 1000 * 3600 * 24 * obj[key].thisWeek &&
                time >
                    hebdomad - (1000 * 3600 * 24 * (obj[key].thisWeek + 1))
            ) {
                console.log(date)
                if (obj[key].thisWeek === 0) {
                    obj[key].isStart = true
                }
                if (obj[key].isStart) {
                    obj[key].thisWeek += 1
                }
            } else if (obj[key].isStart === true) {
                obj[key].isStart = false
                obj[key].isLastStart = true
                obj[key].lastWeek += 1
                obj[key].lastWeekTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999).getTime()
            } else {
                if (obj[key].isLastStart === true) {
                    if (
                        time <
                        obj[key].lastWeekTime - 1000 * 3600 * 24 * obj[key].lastWeek &&
                        time >=
                        obj[key].lastWeekTime -
                                (1000 * 3600 * 24 * (obj[key].lastWeek + 1) - 1)
                    ) {
                        obj[key].lastWeek += 1
                    } else {
                        obj[key].isLastStart = false
                    }
                }
            }
        })
        arr.push(obj[key])
    }
    arr = arr.filter(val => {
        return val.thisWeek !== 0
    })
    console.log(arr)
    return arr.sort((a, b) => {
        return b.thisWeek - a.thisWeek
    })
})()
const barData = {
    month: () => ({
        labels: Array.from({ length: 12 }, (x, y) => capsNumber[y] + '月'),
        datasets: [
            {
                backgroundColor: '#744dfe',
                data: (function() {
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
                backgroundColor: '#744dfe',
                borderSkipped: 'bottom',
                data: (function() {
                    const arr = Array.from({ length: 4 }, x => 0)
                    data.forEach(val => {
                        const quarter = Math.floor(
                            new Date(val.time).getMonth() / 3
                        )
                        arr[quarter] += 1
                    })
                    return arr
                })(),
            },
        ],
    }),
}
export default class WaterLevel extends React.Component {
    state = {
        barDataView: 'month',
        warning: buildingResult[0],
    }

    statistics = (function () {
        const obj = {
            yy: 0,
            mm: 0,
            dd: 0,
            M: 0,
        }
        const date = new Date()
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
            if (ms < hebdomad && ms > hebdomad - (1000 * 3600 * 24 * M)) {
                obj.M++
            }
        })
        return obj
    })()
    componentWillMount() {
        if (window.Chart) {
            parseOptions(Chart, chartOptions())
        }
    }

    toggleBarDataView = viewName => {
        if (viewName === this.state.barDataView) return
        this.setState({
            barDataView: viewName,
        })
    }
    render() {
        let { warning } = this.state
        console.log(warning)
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
                                        onClick={() =>
                                            this.toggleBarDataView('month')
                                        }
                                    >
                                        按月份
                                    </Button>
                                    <Button
                                        className={
                                            this.state.barDataView === 'quarter'
                                                ? 'Bar-card-btn activity'
                                                : 'Bar-card-btn'
                                        }
                                        onClick={() =>
                                            this.toggleBarDataView('quarter')
                                        }
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
                        <div
                            className="Bar-card"
                            style={{ overflow: 'hidden' }}
                        >
                            <div
                                className="f-clear"
                                style={{
                                    padding: '20px 25px 20px 35px',
                                    lineHeight: '32px',
                                }}
                            >
                                <span>连续警戒水位天数</span>
                            </div>
                            <div
                                className="hebdomad"
                                style={{ padding: '20px 0' }}
                            >
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
                                        <div
                                            key={index}
                                            className="all-data-shadow"
                                        >
                                            <span>{obj.key}号监测点</span>
                                            <div style={{ float: 'right' }}>
                                                <span
                                                    style={{ marginRight: 50 }}
                                                >
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
                <p
                    className="warn-message"
                    style={{
                        display: warning.thisWeek === 0 ? 'none' : 'block',
                    }}
                >
                    {warning.key}号监测点连续超警戒水位{warning.thisWeek}天！
                </p>
            </>
        )
    }
}
