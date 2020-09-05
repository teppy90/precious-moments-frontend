import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../AuthContext"
import { Comment, Avatar, Button, Input } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

const { TextArea } = Input;

function SingleComment(props) {

    const { isAuthenticated, user } = useContext(AuthContext);

    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        axios.post('http://localhost:3002/comments/savecomment', variable)
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

    const actions = [
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]


    return (
        <div>
       
            <Comment
                actions={actions}
                author={props.comment.writer.firstName + " " + props.comment.writer.lastName}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }

                content={
                    <p>
                        {props.comment.content}
                    </p>
                }></Comment>

            {OpenReply &&
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
            }

        </div>
    )

}

export default SingleComment 