import React, { useEffect, useState } from 'react';
import { Facode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
    import 'antd/dist/antd.css'

import axios from "axios";
import moment from "moment";
const { Title } = Typography;
const { Meta } = Card


function LandingPage() {
    const [Videos, setVideos] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3002/videos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    const renderCards = Videos.map((video, index) => {


        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`${video._id}/video`} >
                        <video width="400" height="240"  src={video.video_url}/>
            
                    
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.writer.firstName + " " + video.writer.lastName} 
            />
            <span>{video.title}</span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            <span> {moment(video.createdAt).format("Do MMM YYYY")} </span>
        </Col>

    })




    return (

        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Recommended </Title>

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>

    )


}

export default LandingPage;