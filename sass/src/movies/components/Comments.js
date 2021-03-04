import React, {useState, useContext, useEffect} from 'react'
import './Comments.scss';
import Replies from './Replies'
import {AuthContext} from '../../util/context/auth-context';
import {useHttpClient} from '../../util/hooks/http-hook';

const Comments = (props) => {
    const auth = useContext(AuthContext)
    const {sendRequest} = useHttpClient()
    const [showInput, setShowInput] = useState(false);
    const [reply, setReply] = useState()
    const [replies, setReplies] = useState(null);
    const [repliesLoaded, setRepliesLoaded] = useState(false)
    const showInputHandler = (event) => {
        event.preventDefault();
        setShowInput(prevMode => !prevMode)
    }
    
    useEffect(async () => {
        const fetchUsers = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movieSaved/replies/${props.leadCommentId}`, 'GET', null);
            console.log(response)
            await setReplies(response)
        }
        await fetchUsers();
        setRepliesLoaded(true)
    }, [sendRequest])

    const postReply = async (event) => {
        event.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/movieSaved/replies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                leadCommentId: props.leadCommentId,
                replyTo: props.creator,
                comment: '@' + props.name + '  ' +  reply,
                creator: auth.userId
            })
        })
        const responseData = await response.json();
        console.log(responseData)
    }
    const replyHandler = (event) => {
        const reply = event.target.value;
        setReply(reply)
    }
    return (
        <div>
            <div className="profile-description">
                <div className="profile-image">
                    <img src={props.image}/>
                </div>
                <div>
                    <p>{props.name}</p>
                    <p>{props.comment}</p>
                    <a>Like </a> . <a onClick={showInputHandler}>Reply</a> . <span>9m</span>
                </div>
                
            </div>

            
            
            
            {showInput && <div><input onChange={replyHandler}/><br/> <button onClick={postReply}>Reply</button></div>}
            {repliesLoaded && <div className="replies">
                    {replies.map(reply => {
                        return <Replies image={reply.creator.image} reply={reply.comment} name={reply.creator.name}/>
                    })}
                </div>}
        </div>
    )
}

export default Comments
