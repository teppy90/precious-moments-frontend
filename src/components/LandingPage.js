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
                  <Card.Img variant="top" src= {video.thumbnail} />
                  <Card.Body>
                    <Card.Title>
                      <Image src = {video.writer.image} rounded style={{width:"10%"}} /> {video.title}         
                    </Card.Title>
                      <Card.Text>
                        {video.writer.displayName} 
                      </Card.Text>
                  </Card.Body>
              </Card>
              </Col>
              </Row>
              </Container>
              </CardDeck>
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