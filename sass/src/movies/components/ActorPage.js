import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import './ActorPage.css';

const fetchData =  async (actorId) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/actorPage/${actorId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
}

const ActorPage = (props) => {
    const [actorInfo, setActorInfo] = useState(null);
    const actorId = useParams().actor_id;
    const [actorPhotos, setActorPhotos] = useState([]);
    const [actorProfile, setActorProfile] = useState()
    const [birthday, setBirthday] = useState();
    const photos = []
    
    useEffect( async () => {
        const responseData = await fetchData(actorId);
        setActorInfo(responseData)
        const dateSplit = responseData.birthday.split('-');
        
        const day = new Date(dateSplit[0], dateSplit[1], dateSplit[2]).toString().split(' ')
        setBirthday(`${day[1]} ${day[2]} ${day[3]}`);
        if(responseData.images.profiles.length > 0){
            setActorProfile(responseData.images.profiles[0].file_path)
        }
        
    }, [])

    const changePhotoleft = () => {

    }
    return (
        <div>
            {actorInfo && <React.Fragment>
                <div className="actor-page">
                    <h2 className="actor-page__name">{actorInfo.name}</h2>
                    <h3 className="actor-page__department">{actorInfo.known_for_department}</h3>

                    <div className="actor-page__image">
                        {actorInfo.tagged_images.results.map(images => {
                            photos.push(images.media.backdrop_path)
                        }), console.log(photos)}
                    
                        <div className="actor-carousel">
                            
                                {photos[0] && <img src={`https://image.tmdb.org/t/p/original/${photos[0] }`}/>}
                           
                            
                        </div>
                        <div className="actor-profile">
                            <div className="actor-profile__image">
                                <img src={`https://image.tmdb.org/t/p/original/${actorProfile}`}/>
                            </div>
                            <div className="profile-info">
                                <p>{actorInfo.biography.slice(0, 120)}....</p>
                                <p><span>Born:  </span> {birthday}</p>
                            </div>
                        </div>
                        
                    </div>
                   <div className="actor-photos">
                        <h2>Photos</h2>
                        <div className="profile-pic__carousel">
                            {actorInfo.images.profiles.slice(1).map(images => {
                                return <div className="profile-pic">
                                            <img  src={`https://image.tmdb.org/t/p/original/${images.file_path}`}/>
                                    </div>
                            })}
                        </div>
                    </div>
                    <div className="actor-social">
                        <h2>Media</h2>
                        <span>
                            <i class="fab icon fa-twitter"></i> 
                        </span>
                        <span>
                            <i class="fab icon fa-facebook-square"></i>
                        </span>
                        <span>
                            <i class="fab icon fa-instagram"></i>
                        </span>
                        <span></span>
                    </div>
                </div> 
                
            </React.Fragment>}
        </div>
    )
}

export default ActorPage
