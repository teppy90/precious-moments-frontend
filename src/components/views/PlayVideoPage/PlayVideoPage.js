import React, { useEffect, useState } from 'react'
import { List, Avatar } from 'antd';
import Comments from "../PlayVideoPage/comment"
import LikeDislikes from './LikeDislikes';
import "../PlayVideoPage/PlayVideoPage.css";
import moment from 'moment';
import CommentServices from '../../../Services/CommentServices';
import VideoServices from '../../../Services/VideoServices';

function PlayVideoPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        VideoServices.getVideo({videoId: videoId})
        .then(response => {
            if(response.data.success) {
                console.log(response.data.video)
                setVideo(response.data.video)
                setIsLoaded(true);
            } else {
                alert('Failed to get video Info')
            }
        })

        CommentServices.getAllCommentsinOneVideo({postId: videoId})
        .then(response => {
            if (response.data.success) {
                console.log('response.data.comments', response.data.result)
                setCommentLists(response.data.result)
            } else {
                alert('Failed to get comments')
            }
        })

    }, [])

    const updateComment = (newComment) => {
        console.log(newComment)
        setCommentLists(CommentLists.concat(newComment))
    }
    

    return (
        (isLoaded) &&
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            
            <video style={{ width: '50%', height: '50%' }} src={Video.video_url} controls></video> 

           {console.log(Video)}
            <h2>{Video.title}</h2>
            <h5>{moment(Video.createdAt).format("LL")}</h5>
            <List.Item
                            actions={[<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}  />]}
                        >
                <List.Item.Meta
                    avatar={<Avatar src={(Video.writer && Video.writer.image)|| "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png" }   />}
                    title={<a href={`/${Video.writer._id}/pubProf`}> {Video.writer.firstName + " " + Video.writer.lastName}</a>}
                    description={Video.description}
                />
                <div></div>
            </List.Item>

            <Comments CommentLists={CommentLists}  postId={videoId}  refreshFunction={updateComment}/>      

        </div>
    )
}

export default PlayVideoPage