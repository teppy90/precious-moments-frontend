import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../AuthContext';
import { Button, Card, Avatar, Col, Typography, Row } from 'antd';
import moment from "moment";
import VideoServices from '../../../Services/VideoServices';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import UploadVideoPageModal from '../UploadVideoPage/UploadVideoPageModal';
import EditVideoPageModal from '../../EditVideoPageModal';
const { Meta } = Card

function UserProfilePri() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [Videos, setVideos] = useState([]);
    const [isShowUpload, setShowUpload] = useState(false);
    const [isShowEdit, setShowEdit] = useState(false);
    const [forEdit, setForEdit] = useState([]);
    const [Deleted, setDelete] = useState(false);

    useEffect(() => {
        console.log('hello')
        VideoServices.getByUserID(user._id)
            .then(response => {
                if (!response.data) {
                    alert('Failed to get Videos')
                } else {
                    setVideos(response.data)
                }
            })
    }, [forEdit, Deleted])

    const createVideo = () => {
        setShowUpload(!isShowUpload);
    }

    const editVideo = (videoData, index) => {
        setForEdit(videoData);
        setShowEdit(!isShowEdit);
    }

    const deleteVideo = (videoID, index) => {
        VideoServices.deleteOneByID(videoID)
        .then(response => {
            if (!response.data) {
                alert('Failed to delete video')
            } else {
                alert('Successfully deleted')
                setDelete(!Deleted);
            }
        })
    }

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
            >
                <div style={{ margin: '10px' }}>
                    <div>
                        <video style={{ width: '80%' }}>
                            <source src={video.video_url} />
                        </video>
                    </div>
                    <div style={{ textAlign: 'left', width: '80%' }}>
                        <div>Title: {video.title}</div>
                        <div>Total likes: {video.likes}</div>
                        <div>Date uploaded: {moment(video.createdAt).format("DD-MMM-YYYY")} </div>
                    </div>
                    <div>
                        <Button type="primary" shape="round" style={{ margin: '0 20px' }} onClick={()=>editVideo(video,index)} >Edit</Button>
                        <Button type="danger" shape="round" style={{ margin: '0 20px' }} onClick={()=>deleteVideo(video._id,index)}>Delete</Button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div style={{ width: '85%', margin: '1rem auto'}}>
            <h3>My Profile</h3>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '25%' }} >
                    <div>
                        <img style={{ width: "150px", height: "150px", borderRadius: "80px" }}
                            src={user.picture || "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png" } />
                    </div>
                <div>email: {user.email}</div>
                <div>First Name: {user.firstName}</div>
                <div>Last Name: {user.lastName}</div>
                </div>
                <div style={{ width: '70%' }} >
                    <h4>My uploaded videos</h4>
                    <Row>
                        <div
                        onClick={createVideo}
                        style={{
                            width: '150px',
                            height: '250px',
                            border: '2px dashed #676CFB',
                            borderRadius: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            margin: '5px'
                        }}>
                            <PlusOutlined style={{ position: 'unset' }} />
                        </div>
                        {renderCards}
                    </Row>
                </div>
            </div>
                            <UploadVideoPageModal show={isShowUpload} setShow={setShowUpload} />
                            <EditVideoPageModal show={isShowEdit} setShow={setShowEdit} videoData={forEdit} setVideoData={setForEdit} />
        </div>
    )
}

export default UserProfilePri