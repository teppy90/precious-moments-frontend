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

    


useEffect(() => {



    const onLike = () => {

        if (LikeAction === null) {

            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        //If dislike button is already clicked

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }


    const onDisLike = () => {

        if (DislikeAction !== null) {

            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)

                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {

            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        //If dislike button is already clicked
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert('Failed to increase dislike')
                    }
                })


        }


    }