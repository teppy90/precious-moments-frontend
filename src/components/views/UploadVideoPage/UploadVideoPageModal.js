import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import Dropzone from 'react-dropzone';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import VideoServices from '../../../Services/VideoServices';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';

const { TextArea } = Input;

const Category = [
    { value: 0, label: "Others" },
    { value: 1, label: "Sports" },
    { value: 2, label: "Music" },
    { value: 3, label: "Tutorial" },
    { value: 4, label: "Comedy" },
]

function UploadVideoPageModal(props) {
    const [statusDZ, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Others");
    const [videoFileName, setVidFileName] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeCategory = (event) => {
        setCategory(event.currentTarget.value)
    }

    const createVideo = () => {
        if (!title) {
            alert('Please give a title to the video')
        } else if (!description) {
            alert('Please give a short description of the video')
        } else if (!videoFile) {
            alert('Please attach a video file')
        } else {
            setLoading(true);
            let bodyData = new Object();
            bodyData.title = title;
            bodyData.description = description;
            bodyData.category = category;
            let formData = new FormData();
            formData.append('file', videoFile);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            VideoServices.create(formData, bodyData)
                .then(res => {
                    if (res.ok) {
                        alert('video successfully uploaded!')
                        setLoading(false);
                        props.setShow(!props.show);
                    } else {
                        alert(res);
                    }
                })
        }
    }

    const handleDrop = (acceptedFile, rejectedFile) => {
        if (rejectedFile.length <= 0) {
            setVideoFile(acceptedFile[0]);
            setVidFileName(acceptedFile[0].name);
        } else {
            alert(rejectedFile[0].errors[0].message);
        }
    }

    const toUploadFile = (getInputProps) => {
        return (
            <>
                <input {...getInputProps()} />
                <PlusOutlined style={{ position: 'unset' }} />
                <p>Drag & drop your file here, or click to select file</p>
            </>
        )
    }

    const unSetVideo = () => {
        setVidFileName(null);
        setVideoFile(null);
    }

    const attachedFile = () => {
        return (
            <>
                Attached file:
                <br /><br />
                {videoFileName}
                <br /><br />
                <DeleteOutlined onClick={unSetVideo} />
            </>
        )
    }

    const toggle = () => {
        setVidFileName(null);
        setVideoFile(null);
        setTitle('');
        setDescription('');
        setCategory('Others');
        props.setShow(!props.show);
    }

    const closeModal = () => {
        setVidFileName(null);
        setVideoFile(null);
        setTitle('');
        setDescription('');
        setCategory('Others');
        props.setShow(false);
    }

    return (

        <MDBContainer>
            <MDBModal isOpen={props.show} toggle={toggle}>
                <MDBModalHeader style={{ backgroundColor:'#676CFB' }}><span style={{color:"white"}}>Upload Video</span></MDBModalHeader>
                <MDBModalBody>
                    <Form onSubmit={createVideo}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Dropzone
                                accept="video/*"
                                multiple={false}
                                maxSize={31457280}
                                onDrop={(acceptedFile, rejectedFile) => handleDrop(acceptedFile, rejectedFile)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        style={{
                                            width: '300px',
                                            height: '240px',
                                            border: '2px dashed #676CFB',
                                            borderRadius: '25px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                        {...getRootProps({ className: statusDZ })}
                                    >
                                        <div>
                                            {!videoFileName ? toUploadFile(getInputProps) : attachedFile()}
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>

                        <br /><br />
                        <label>Title</label>
                        <Input
                            onChange={handleChangeTitle}
                            value={title}
                            required={true}
                        />
                        <br /><br />
                        <label>Description</label>
                        <TextArea onChange={handleChangeDecsription} value={description} required={true} />

                        <br /><br />
                        <label>Video Category:   </label>
                        <select onChange={handleChangeCategory}>
                            {Category.map((item, index) => (
                                <option key={index} value={item.label} selected={item.label === "Others" ? "selected" : ""}>{item.label}</option>
                            ))}
                        </select>
                        <br /><br />
                        {isLoading ? <Button type="primary" shape="round" size="large" loading>Uploading</Button> : <Button type="primary" size="large" shape="round" onClick={createVideo} style={{ margin: '0 10px' }}>Submit</Button>}
                        <Button type="primary" size="large" shape="round" onClick={closeModal} style={{ margin: '0 10px' }}>Cancel</Button>
                    </Form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
    )
}

export default UploadVideoPageModal

