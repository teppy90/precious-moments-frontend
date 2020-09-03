import React, { useEffect, useState } from 'react';
import { Facode } from "react-icons/fa";
import { Avatar, Typography } from 'antd';
import { Card, CardDeck, Container, Image, Col, Row } from 'react-bootstrap'

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
        
        let minutes = Math.floor(video.duration / 60)
        let seconds = Math.floor(video.duration - minutes * 60)        
        
        return <CardDeck>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '16rem' }}>                    

                            <Card.Link href={`/video/${video._id}`}>
                            {/* should it be video/${video._id} cuz of app.js routing? */}
                                <Card.Img variant="top" src="https://res.cloudinary.com/dgsrnct2b/video/upload/v1599117932/preciousmoment/mtfmvtotmfid6v5go7bd.mp4" />
                            </Card.Link>                            
                            <Card.Body>
                                <Card.Title>
                                    <Image src={Videos.writer && Videos.writer.image} rounded style={{ width: "10%" }} /> {video.title}
                                </Card.Title>
                                <Card.Text>
                                    {Videos.writer && Videos.writer.displayName} 
                    {/* had to add videos.writer && */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </CardDeck >
    })    
    
    return (
        <>
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={2} > Recommended </Title>                
                
                <Row gutter={16}>
                    {renderCards}
                </Row>
            </div>       
            
        </>
    )}
    
    export default LandingPage

// import React, { useEffect, useState } from 'react';
// import { Facode } from "react-icons/fa";
// import { Card, Avatar, Col, Typography, Row } from 'antd';
// import axios from "axios";
// import moment from "moment";
// const { Title } = Typography;
// const { Meta } = Card


// function LandingPage() {

//     const [Videos, setVideos] = useState([])

//     useEffect(() => {
//         axios.get('http://localhost3002/videos/getvideos')
//             .then(response => {
//                 if (response.data.success) {
//                     console.log(response.data.videos)
//                     setVideos(response.data.videos)
//                 } else {
//                     alert('Failed to get Videos')
//                 }
//             })
//     }, [])

//     const renderCards = Videos.map((video, index) => {

//         let minutes = Math.floor(video.duration / 60)
//         let seconds = Math.floor(video.duration - minutes * 60)

//         return <Col lg={6} md={8} xs={24}>
//             <div style={{ position: 'relative' }}>
//                 <a href={`/video/${video._id}`} >
//                 <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:3000/${video.thumbnail}`} />
//                 <div className=" duration"
//                     style={{
//                         bottom: 0, right: 0, position: 'absolute', margin: '4px',
//                         color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
//                         padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
//                         fontWeight: '500', lineHeight: '12px'
//                     }}>
//                     <span>{minutes} : {seconds}</span>
//                 </div>
//                 </a>
//             </div><br />
//             <Meta
//                 avatar={
//                     <Avatar src={video.writer.image} />
//                 }
//                 title={video.title}
//             />
//             <span>{video.writer.name} </span><br />
//             <span style={{ marginLeft: '3rem' }}> {video.views}</span>
//     - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
//         </Col>
//     })

//     return (
//         <div style={{ width: '85%', margin: '3rem auto' }}>
//             <Title level={2} > Recommended </Title>
//             <hr />

//             <Row>
//                 {renderCards}
//             </Row>
//         </div>
//     )


// }

// export default LandingPage;