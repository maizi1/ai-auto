import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

function Home() {
    return (
        <div className="Home">
            <h1 className="title">基于机器视觉学习算法的智能识别系统</h1>
            <div className="Card-box">
                <Card
                    text="高空抛物"
                    imgUrl={require('assets/img/high-toss-act-2.png')}
                    link="/admin/HighTossActAllData"
                ></Card>
                <Card
                    text="水位监测"
                    imgUrl={require('assets/img/hedao-2.png')}
                    borderColor="#cccc00"
                    link="/admin/WaterLevel"
                ></Card>
                <Card
                    text="安全帽监测"
                    imgUrl={require('assets/img/helmet-2.png')}
                    borderColor="#0099cc"
                    link="/admin/HelmetTable"
                ></Card>
                <Card
                    text="设备监测"
                    imgUrl={require('assets/img/tongxin-2.png')}
                    borderColor="#cc0066"
                    link="/admin/FacilityTable"
                ></Card>
                <Card
                    text={<>更多<span style={{letterSpacing: -5}}>......</span></>}
                    imgUrl={require('assets/img/more.png')}
                    borderColor="#cc0066"
                    link=""
                ></Card>
            </div>
        </div>
    )
}

function Card({ imgUrl, text, link = '/', borderColor }) {
    return (
        <div className="Card" style={{ borderColor: borderColor }}>
            <Link to={link}>
                <img src={imgUrl} width="109" height="115" alt="" />
                <p>{text}</p>
            </Link>
        </div>
    )
}

export default Home
