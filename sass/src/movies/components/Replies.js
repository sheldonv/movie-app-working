import React from 'react'
import './Replies.css'

const Replies = (props) => {
    const showInputHandler = () => {

    }
    return (
        <div>
            <div className="reply">
                <div className="reply__image">
                    <img src={props.image ? props.image: 'https://www.stylist.co.uk/images/app/uploads/2016/07/25063058/alicia-keys-1-256x256.jpg?w=256&h=256&fit=max&auto=format%2Ccompress'} alt="Alicia Keys"/>
                </div>
                <div className="reply__info">
                    <p>{props.name}</p>
                    <p>{props.reply}</p>
                    <a>Like </a> . <a onClick={showInputHandler}>Reply</a> . <span>9m</span>
                </div>
                
            </div>
        </div>
        
    )
}

export default Replies
