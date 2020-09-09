import React, { useEffect, useState } from 'react'
import { Row } from 'antd';
import moment from "moment";
import VideoServices from '../../../Services/VideoServices';
import UserServices from '../../../Services/UserServices';

function UserProfilePub(props) {
    const [Videos, setVideos] = useState([])
    const [theUser, setUser] = useState([])

    useEffect(() => {
        VideoServices.getByUserID(props.match.params.userID)
            .then(res => {
                setVideos(res.data);
            }).then(
                UserServices.getUserInfo(props.match.params.userID)
                    .then(res => {
                        setUser(res.data);
                    })
            )
    }, [])

    const renderCards = Videos.map((video, index) => {

        return (
            <div
                style={{
                    width: '300px',
                    height: '250px',
                    border: '2px solid #676CFB',
                    borderRadius: '25px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    margin: '5px'
                }}
                onClick={() => window.location.href = `/video/${video._id}`}
            >
                <div style={{ margin: '10px' }}>
                    <div>
                        <video style={{ width: '80%', maxHeight: '140px' }}>
                            <source src={video.video_url} />
                        </video>
                    </div>
                    <div style={{ textAlign: 'left', width: '80%' }}>
                        <div>Title: {video.title}</div>
                        <div>Total likes: {video.likes}</div>
                        <div>Date uploaded: {moment(video.createdAt).format("DD-MMM-YYYY")} </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div style={{ width: '85%', margin: '1rem auto' }}>
            <h3>{`${theUser.firstName}'s Profile`}</h3>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '25%' }} >
                    <div>
                        <img style={{ width: "150px", height: "150px", borderRadius: "80px" }}
                            src={theUser.image || "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png"} />
                    </div>
                    <div>email: {theUser.email}</div>
                    <div>First Name: {theUser.firstName}</div>
                    <div>Last Name: {theUser.lastName}</div>
                </div>
                <div style={{ width: '70%' }} >
                    Videos by {theUser.firstName}
                    <Row>
                        {renderCards}
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePub
