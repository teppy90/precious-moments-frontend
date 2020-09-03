import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthContext';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from "moment";
const { Meta } = Card

function UserProfilePri() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [Videos, setVideos] = useState([]);

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
                        <Avatar src={user.image_url} />
                    }
                    title={video.title}
                />
                <span>{user.name} </span><br />
                <span style={{ marginLeft: '3rem' }}> {video.views}</span>
                - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </Col>
        )
    })

    return (
        <div style={{ width: '85%', margin: '1rem auto' }}>
            <h3>Username's Profile</h3>
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

export default UserProfilePri
