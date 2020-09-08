import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../AuthContext"
import { Comment, Avatar, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import CommentServices from '../../../Services/CommentServices';
import {useHistory} from 'react-router-dom';

const { TextArea } = Input;


function SingleComment(props) {
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    const history = useHistory()


    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    
    const onSubmitUnauthenticateed = (e) => {
        console.log('not authenticated')
        history.push('/login')

    }

    const onSubmit = (e) => {
        e.preventDefault();
            const variable = {
                writer: user._id,
                postId: props.postId,
                responseTo: props.comment._id,
                content: CommentValue
            }
            CommentServices.saveComments(variable)
                .then(response => {
                    if (response.data.success) {
                        setCommentValue("")
                        setOpenReply(!OpenReply)
                        props.refreshFunction(response.data.result)
                    } else {
                        alert('Failed to save comment')
                    }
                })
    }

    const unauthenticatedComments = () => {
        return (
            <form style={{ display: 'flex' }} onSubmit={onSubmitUnauthenticateed}>
            <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmitUnauthenticateed}>Submit</Button>
        </form>
        )
    }

    const authenticatedComments = () => {
        return (
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </form>
        )
       
    }

    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]
    return (
        <div>
            {console.log(isAuthenticated)}
            <Comment
                actions={actions}
                author={props.comment.writer.firstName + " " + props.comment.writer.lastName}
                avatar={
                    <Avatar
                        src={props.comment.writer.image || "https://i.ibb.co/djkcPvD/blank-profile-picture-973460-640.png"}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }></Comment>
            {OpenReply &&
                    <>
                                {!isAuthenticated ? unauthenticatedComments() : authenticatedComments()}

                    </>
                
            }
        </div>
    )
}

export default SingleComment