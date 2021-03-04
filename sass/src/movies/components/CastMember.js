import React from 'react'
import './CastMember.css'
import {Link} from 'react-router-dom';
const CastMember = (props) => {
    return (
        <Link to={`/actor/${props.id}`}>
            <div className="cast-member">
                <div className="cast-member__image">
                    <img src={`https://image.tmdb.org/t/p/original/${props.image}`}/>
                </div>
                <div >
                    <h3 className="cast-member__name" >{props.name}</h3>
                </div>
            </div>
        </Link>
        
    )
}

export default CastMember
