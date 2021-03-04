import React, {useContext, useState, useCallback, useEffect} from 'react'
import './Profile.css'
import {AuthContext} from '../../util/context/auth-context';
import {useHttpClient} from '../../util/hooks/http-hook';
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link} from 'react-router-dom'

const sendRequest = async (url, method = 'GET', body = null, headers={'Content-Type': 'application/json'}) => {
    const response = await fetch(url, {
        method,
        body,
        headers
    })
    const responseData = await response.json();
    console.log(responseData)
    return responseData
}
const Profile = (props) => {
    const [profile, setProfile] = useState(null)
    const auth = useContext(AuthContext)

    /*const http = useCallback(async (url, method = 'GET', body = null, headers = {
        'Content-Type': 'application/json'
    }) => {
        const response = await fetch(url, {
            method,
            body,
            headers
        })
        const responseData = await response.json()
        console.log(responseData)
    
        return responseData;
    }, [])*/
    useEffect(async () => {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/profile/${auth.userId}`);
        setProfile(responseData)
    },[])
    
    
    return (    
        <div className="profile">
            {profile && <React.Fragment>
                <div className="profile__form">
                    <div className="profile__image">
                         <img src={profile.image} alt="profile"/>
                    </div> 
                    <div className="profile__info">
                        <div>
                            <p><span className="profile__category">NAME:</span> <span>{profile.name}</span></p>
                        </div>
                        
                        <div>
                            <p><span className="profile__category">EMAIL:</span> {profile.email}</p>
                        </div>
                        <div className="button__div">
                            <Button
                                variant="contained"
                                color="default"
                                component={Link}
                                to={`/update/${profile._id}`}
                                >
                                Upload
                            </Button>
                        </div>
                        
                    </div>
                    
                </div>
                
            </React.Fragment>}
           
        </div>
    )
}

export default Profile
