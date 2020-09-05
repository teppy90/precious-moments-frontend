import React, { useEffect, useState } from 'react';
import { Facode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import 'antd/dist/antd.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import moment from "moment";
import '../components/landingpage.css'
import VideoServices from '../Services/VideoServices';

const { Title } = Typography;
const { Meta } = Card

function LandingPage(props) {
    const [Videos, setVideos] = useState([])


    useEffect(() => {
        VideoServices.getAll()
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };



    const renderCards = Videos.map((video, index) => {


        return (

            <div className='item'>

                <a href={`/video/${video._id}`} >
                    <video width="300" height="240" src={video.video_url} />
                </a>



            </div>

        )

    })




    return (

        <div style={{ width: '85%', margin: '2rem auto' }}>
            <Title level={2} > Recommended </Title>
            <Carousel className='container'
                swipeable={false}
                draggable={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >

                {renderCards}


            </Carousel>




        </div>

    )


}

export default LandingPage;