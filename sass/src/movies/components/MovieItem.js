import React from 'react'
import './MovieItem.scss';
import {Link} from 'react-router-dom';
const MovieItem = (props) => {
    return (
        <li className="movie-item">
            <Link to={`/movie/${props.id}`}>
                <div className="movie-item__image">
                    <img src={`https://image.tmdb.org/t/p/original/${props.image}`} />
                </div>
                <div className="movie-item__title">
                    <h2>{props.title}</h2>
                </div>
            </Link>
            
        </li>
    )
}

export default MovieItem
