import React from 'react'

const ActorSearchResults = (props) => {
    return (
        <div onClick={props.onClick} className={props.className} value={props.actor_id} data-actor_id={props.actor_id} id={props.actor_id}>
            {props.name}
        </div>
    )
}

export default ActorSearchResults
