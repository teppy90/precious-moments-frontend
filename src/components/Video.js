import React, { useEffect, useState } from 'react';
import Comments from "../components/comment"
import { Facode } from "react-icons/fa";
import { Avatar, Typography } from 'antd';
import { Card, CardDeck, Container, Image, Col, Row } from 'react-bootstrap'
import axios from 'axios'

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState([])
    const [CommentLists, setCommentLists] = useState([])




    useEffect(() => {

            axios.post('http://localhost:3002/comments/getcomments', {postId: videoId})
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
        <>
        <Comments CommentLists={CommentLists}  postId={videoId}  refreshFunction={updateComment}/>      
        </>
    )


}

export default DetailVideoPage;