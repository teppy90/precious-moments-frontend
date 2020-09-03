import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from "moment";
const { Meta } = Card;
const videoUrl = 'https://res.cloudinary.com/dgsrnct2b/video/upload/v1598963152/preciousmoment/talocjfqqjldi3ydmftl.mp4';

function UserProfilePub() {
    const [Videos, setVideos] = useState([])
    const [theUser, setUser] = useState([])

    useEffect(() => {
        console.log('hello')
    }, [])

    const renderCards = Videos.map((video, index) => {

        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <video>
                        <source src={video.video_url} />
                    </video>
                </div><br />
                <Meta
                    avatar={
                        <Avatar src={theUser.image_url} />
                    }
                    title={video.title}
                />
                <span>{theUser.name} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views}</span>
                - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </Col>
        )
    })

    return (
        <div style={{ width: '85%', margin: '1rem auto' }}>
            <h3>User's Profile</h3>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '25%' }} >
                    My Photo
            </div>
                <div style={{ width: '60%' }} >
                    Videos by user's name
                    <Row>
                        {renderCards}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePub
