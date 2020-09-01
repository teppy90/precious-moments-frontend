import React, { useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from "moment";
const { Meta } = Card

function UserProfilePub() {
    const [Videos, setVideos] = useState([])

    const renderCards = Videos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60)
        let seconds = Math.floor(video.duration - minutes * 60)

        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:3000/${video.thumbnail}`} />
                    <div className=" duration"
                        style={{
                            bottom: 0, right: 0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                            fontWeight: '500', lineHeight: '12px'
                        }}>
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div><br />
                <Meta
                    avatar={
                        <Avatar src={video.writer.image} />
                    }
                    title={video.title}
                />
                <span>{video.writer.name} </span><br />
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
