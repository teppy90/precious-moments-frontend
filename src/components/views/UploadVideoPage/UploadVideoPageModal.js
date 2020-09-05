import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import Dropzone from 'react-dropzone';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import VideoServices from '../../../Services/VideoServices';
import LoadingOverlay from 'react-loading-overlay';
import { MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Public' },
    { value: 1, label: 'Private' }
]

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
            let bodyData = new Object();
            bodyData.title = title;
            bodyData.description = description;
            bodyData.category = category;
            let formData = new FormData();
            formData.append('file', videoFile);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            setLoading(true);
            VideoServices.create(formData, bodyData)
                .then(res => {
                    setLoading(false);
                    alert(res);
                })
                .then(() => {
                    console.log('hello')
                });
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
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Uploading video...'
        >
            <MDBContainer>
                <MDBModal isOpen={props.show} toggle={toggle}>
                    <MDBModalHeader>Upload Video</MDBModalHeader>
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
                                    <option key={index} value={item.label} selected={item.label==="Others"? "selected": ""}>{item.label}</option>
                                ))}
                            </select>
                            <br /><br />
                                <Button type="primary" size="large" shape="round" onClick={createVideo} style={{margin:'0 10px'}}>
                                    Submit
            </Button>
                                <Button type="primary" size="large" shape="round" onClick={closeModal} style={{margin:'0 10px'}}>
                                    Cancel
            </Button>
                        </Form>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        </LoadingOverlay>


    )
}

export default UploadVideoPageModal