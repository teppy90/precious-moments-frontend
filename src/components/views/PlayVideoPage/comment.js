import React, { useState, useContext } from 'react';
import { Button, Input } from 'antd';
import { AuthContext } from "../../../AuthContext"
import SingleComment from "../PlayVideoPage/SingleComment"
import ReplyComment from "../PlayVideoPage/replycomment"
import CommentServices from '../../../Services/CommentServices';
import { useHistory } from 'react-router-dom';
const { TextArea } = Input;

function Comments(props) {

    const [Comment, setComment] = useState("");
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
    const history = useHistory()


    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmitUnauthenticateed = (e) => {
        console.log('not authenticated')
        history.push('/login')

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variable = {
            content: Comment,
            writer: user._id,
            postId: props.postId
        }
        CommentServices.saveComments(variable)
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

    const unauthenticatedComments = () => {
        return (
            <form style={{ display: 'flex' }} onSubmit={onSubmitUnauthenticateed}>
            <TextArea
                Style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={Comment}
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
                Style={{ width: '100%', borderRadius: '5px' }}
                onChange={handleChange}
                value={Comment}
                placeholder="write some comments"
            />
            <br />
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </form>
        )
       
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
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                ))
            }
            {!isAuthenticated ? unauthenticatedComments() : authenticatedComments()}
        </div>
    )
}

export default Comments;