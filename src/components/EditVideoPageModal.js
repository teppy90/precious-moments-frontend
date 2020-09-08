import React, { useEffect, useState } from 'react'
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';
import { Button, Input } from 'antd';
import VideoServices from '../Services/VideoServices';

function EditVideoPageModal(props) {
    const [title, setTitle] = useState(props.videoData ? props.videoData.title : '');
    const [description, setDescription] = useState(props.videoData ? props.videoData.description : '');
    const [category, setCategory] = useState(props.videoData ? props.videoData.category : 'others');

    const Category = [
        { value: 0, label: "Others" },
        { value: 1, label: "Sports" },
        { value: 2, label: "Music" },
        { value: 3, label: "Tutorial" },
        { value: 4, label: "Comedy" },
    ]

    useEffect(() => {
        setTitle(props.videoData.title)
        setDescription(props.videoData.description)
        setCategory(props.videoData.category)
    }, [props.videoData])

    const toggle = () => {
        props.setVideoData([]);
        props.setShow(!props.show);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDescription = (event) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeCategory = (event) => {
        setCategory(event.currentTarget.value)
    }

    const updateVideo = () => {
        let bodyData = new Object();
        bodyData.title = title;
        bodyData.description = description;
        bodyData.category = category;
        VideoServices.updateOneByID(props.videoData._id, bodyData)
            .then(res => {
                alert(res);
                props.setVideoData([]);
                props.setShow(false);
            })
    }

    const closeModal = () => {
        props.setVideoData([]);
        props.setShow(false);
    }

    return (
        props.videoData &&
        <MDBContainer>
            <MDBModal isOpen={props.show} toggle={toggle}>
                <MDBModalHeader style={{backgroundColor:'#676CFB'}} ><span style={{color:"white"}}>Edit Video</span></MDBModalHeader>
                <MDBModalBody>
                    <label>Video Title</label>
                    <Input
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <br /><br />
                    <label>Video Description</label>
                    <Input
                        onChange={handleChangeDescription}
                        value={description}
                    />
                    <br /><br />
                    <label>Video Category</label>
                    <select onChange={handleChangeCategory}>
                        {Category.map((item, index) => (
                            <option key={index} value={item.label} selected={props.videoData.category === item.label ? 'selected' : ''}>{item.label}</option>
                        ))}
                    </select>
                    <br /><br />
                    <Button type="primary" size="medium" shape="round" onClick={updateVideo} style={{ margin: '0 10px' }}>Save changes</Button>
                    <Button type="primary" size="medium" shape="round" onClick={closeModal} style={{ margin: '0 10px' }}>Cancel</Button>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    )
}

export default EditVideoPageModal