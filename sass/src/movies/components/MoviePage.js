import React, {useState, useEffect, useCallback, useContext} from 'react'
import {useHttpClient} from '../../util/hooks/http-hook';
import {useParams} from 'react-router-dom'
import './MoviePage.css';
import CastMember from './CastMember';
import Videos from './Videos';
import Inputs from '../../shared/formElements/Inputs';
import {AuthContext} from '../../util/context/auth-context';
import Comments from './Comments';

const MoviePage = (props) => {
    const auth = useContext(AuthContext);
    const movie_id = useParams().movie_id;
    
    const [movieData, setMovieData] = useState();
    const [isLoading, setIsLoading] = useState();
    const [videoId, setVideoId] = useState();
    const {sendRequest} = useHttpClient();
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState();
    const [showComments, setShowComments] = useState(false);
    const [leadComments, setLeadComments] = useState()
    useEffect(async () => {
        setIsLoading(true);
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movie/home/${movie_id}`, 'GET', null);
        await setMovieData(response)
        console.log(response)
        setIsLoading(false);
    }, [sendRequest, movie_id])
    useEffect(async () => {
        setIsLoading(true);
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movieSaved/comments/${movie_id}`, 'GET', null);
        await setLeadComments(response)
        console.log(response)
        setIsLoading(false);
    }, [sendRequest])
    useEffect(() => {
        return () => {
            console.log('useEffect')
        }
    }, [])
    const setVideo = useCallback((childData) => {
        setVideoId(childData);
    }, [])
    const postComment = async (event) => {
        console.log('reached')
        event.preventDefault();
        console.log(comment, movie_id, auth.userId)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/movieSaved`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token
            },
            body: JSON.stringify({
                movieId: movie_id,
                comment: comment,
                creator: auth.userId,
                userName: auth.userName
            })
        })
        const responseData = await response.json()
        console.log(responseData)
    }
    const showId = (event) => {
        
    }
    const commentsHandler = (event) => {
        const comment = event.target.value
        setComment(comment);
    }
    const showCommentsHandler = () => {
        setShowComments(prevMode => !prevMode)
        console.log(leadComments)
    }
    return (
        <React.Fragment>
            {movieData && !isLoading && 
            <div className="movie-page">
                
                <div className="movie-page__main-image">
                    <img src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}/>
                    
                </div>
                <div><h1 className="movie-title">{movieData.original_title}<span className="movie-release">  ({movieData.release_date.slice(0, 4)})</span></h1></div>
                
                 
                
                <div className="movie-page__info-wrapper">
                    <div className="movie-page__info">
                        <div className="movie-page__info-bar">
                            <span>{movieData.runtime} min</span>
                            <span>{movieData.genres[0].name}</span>
                            <span><a href={`https://www.imdb.com/title/${movieData.imdb_id}/?ref_=hm_inth_1`}>IMDB</a></span>
                            <span className="movie-page__rating">
                                <i class="fas fa-star rating-icon" ></i><span>{movieData.vote_average}</span>
                            </span>
                        </div>
                    <div/>
                </div>
                </div>
                <div className="movie-profile">
                    <div className="movie-profile__image">
                        <img src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}/>
                    </div>
                    <div className="movie-profile__info">
                        <p>{movieData.overview.slice(0, 250)}</p>
                    </div>
                </div>
                <div className="videos">
                <h2>Videos</h2>
                    <div className="movie-page__videos">
                        
                        {movieData.videos.results.map(video => {
                            return (
                                <Videos onClick={ async () => {
                                    console.log(video.key)
                                    await setVideoId(video.key)
                                    console.log(movieData)
                                }} movieId={video.key} title={movieData.original_title} id={video.key}/>
                            )
                        })}
                    </div>
                </div>
                
                <div className="comments-wrapper" id="comments-wrapper">
                    <div onClick={showCommentsHandler}>
                        <h2 className="comments-title">
                            Comments
                        </h2>
                    </div>
                    {showComments && <div className="comment-handler">
                    <input placeholder="Add a Comment" id="comment" className="comments-input" onChange={commentsHandler}/>
                    
                        <button onClick={postComment}>POST</button>
                    </div>}
                    {showComments && leadComments && <div>
                        {leadComments.leadComments.map(leadComment => {
                            return <Comments image={`${leadComment.creator.image}`} leadCommentId={leadComment._id} creator={leadComment.creator} name={leadComment.userName} comment={leadComment.comment}/>
                        })}
                    </div>}
                    <hr/>
                    <div>
                        
                    </div>
                </div>
                <div>
                    
                </div>
                <div className="credits">
                    <h2>Credits</h2>
                    {movieData.credits.cast.map(member => {
                        return (
                            <CastMember
                            image={member.profile_path}
                            name={member.name} 
                            id={member.id}/>
                        )
                    })}
                </div>   
            </div>}
        </React.Fragment>
        
    )
}

export default MoviePage
