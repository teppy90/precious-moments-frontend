import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import 'antd/dist/antd.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../components/landingpage.css'
import VideoServices from '../Services/VideoServices';

const { Title } = Typography;

function LandingPage(props) {
    const [Videos, setVideos] = useState(null);
    const [comedyVideos, setComedy] = useState(null);
    const [othersVideos, setOthers] = useState(null);
    const [sportsVideos, setSports] = useState(null);
    const [musicVideos, setMusic] = useState(null);
    const [tutorialVideos, setTutorial] = useState(null);

    useEffect(() => {
        VideoServices.getAll()
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    setVideos(response.data.videos)
                    setComedy(response.data.videos.filter(video => video.category === 'Comedy'))
                    setOthers(response.data.videos.filter(video => video.category === 'Others'))
                    setSports(response.data.videos.filter(video => video.category === 'Sports'))
                    setMusic(response.data.videos.filter(video => video.category === 'Music'))
                    setTutorial(response.data.videos.filter(video => video.category === 'Tutorial'))
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

    const renderCards = (data) => {
        return data.map((video, index) => {
            return (
                <div className='item' style={{ maxHeight: '170px' }}>
                    <a href={`/video/${video._id}`} >
                        <video width="100%" src={video.video_url} />
                    </a>
                </div>
            )
        }
        )
    }

    const renderCarousel = (data) => {
        return (
            data[0] &&
            <>
                <Title level={2} > {data[0].category} </Title>
                <Carousel className='container'
                    swipeable={true}
                    draggable={true}
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
                    {renderCards(data)}
                </Carousel>
            </>
        )
    }

    return (
        <div style={{ width: '85%', margin: '2rem auto' }}>
            <Title level={2} > Recommended </Title>
            <Carousel className='container'
                swipeable={true}
                draggable={true}
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
                {Videos ? renderCards(Videos) : ''}
            </Carousel>

            {comedyVideos ? renderCarousel(comedyVideos) : ''}
            {sportsVideos ? renderCarousel(sportsVideos) : ''}
            {othersVideos ? renderCarousel(othersVideos) : ''}
            {musicVideos ? renderCarousel(musicVideos) : ''}
            {tutorialVideos ? renderCarousel(tutorialVideos) : ''}

        </div>
    )
}

export default LandingPage;