import React, { useState, useContext } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import { AuthContext } from "../../../AuthContext"
import SingleComment from "../PlayVideoPage/SingleComment"
import ReplyComment from "../PlayVideoPage/replycomment"
const { TextArea } = Input;

function Comments(props) {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: Comment,
            writer: user._id,
            postId: props.postId      
        }

        axios.post('http://localhost:3002/comments/savecomment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    console.log(response.data.result)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save comment')
                }
            })
    }

    return (

        <div>
            <br />
            <h4>Comment</h4>
            <hr />
            {/* Comment Lists */}
            {/*Root Comment Form*/}
            {console.log(props.CommentLists)}
           


             {props.CommentLists && props.CommentLists.map((comment, index) =>
                (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId= {comment._id} refreshFunction={props.refreshFunction}/>

                </React.Fragment>
                ))
             }



            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    Style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>

            </form>




        </div>
    )
}

export default Comments;