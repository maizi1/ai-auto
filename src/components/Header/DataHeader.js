import React from 'react'
import './DataHeader.css'

function Card ({ text, number, color, icon }) {
    return (
        <div
            className="DataHeader-card"
            style={{
                borderRadius: 6,
                backgroundImage: `linear-gradient(-90deg, ${ color[0] } 0,${
                    color[1]
                    } 100%)`,
            }}
        >
            <p
                className="DataHeader-card-title"
                style={{
                    backgroundImage: `url(${ require('assets/img/' + icon) })`,
                }}
            >
                {text}数据
            </p>
            <p className="DataHeader-card-number">{number}次</p>
        </div>
    )
}
function Header ({ yy, mm, dd, M}) {
    return (
        <div
            className="d-flex d-space-between DataHeader"
            style={{ margin: '0 -15px', color: '#fff', letterSpacing: 1 }}
        >
            <Card
                text="当日"
                number={dd}
                color={['#1099D1', '#46E0D6']}
                icon="icon4.png"
            />
            <Card
                text="本周"
                number={M}
                color={['#FD5D9F', '#9270FF']}
                icon="icon2.png"
            />
            <Card
                text="本月"
                number={mm}
                color={['#F35969', '#F8CF8B']}
                icon="icon1.png"
            />
            <Card
                text="全年"
                number={yy}
                color={['#A7CDFE', '#764FFD']}
                icon="icon3.png"
            />
        </div>
    )
}

export default Header