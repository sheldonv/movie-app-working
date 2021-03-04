import React, {useEffect, useState, useContext} from 'react'
import './SearchBar.css'
import Input from '../formElements/Inputs'
import { REQUIRE } from '../../util/validators/validator'
import { useForm } from '../../util/hooks/form-hook'
import { sendRequest } from '../../util/hooks/http-hook'
import axios from 'axios'
import {searchContext} from '../../util/context/search-context';

const SearchBar = (props) => {
    const [searchResults, setSearchResults] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const search = useContext(searchContext);
    const [present, setPresent] = useState({
        movie: false,
        tv: false,
        person: false
    });
    const inputHandler = async (event) => {
        
        // need to find a way to load the component after the images have entered the DOM
        console.log(event.target.value)
        let query = event.target.value;
        if(!query || query.trim().lenth === 0){
            console.log('reached')
            /*setPresent({
                movie: false,
                tv: false,
                person: false
            })*/
            await props.parentCallback([])
            await props.present(present);
        }else{
            
            props.loading(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/database/${query}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            body: null
        })
        const responseData = await response.json()
        console.log(responseData.results)
        responseData.results.map(result => {
            if(result.media_type === 'tv'){
                setPresent({...present, tv: 'TV'})
            }
            if(result.media_type === 'movie'){
                setPresent({...present, movie: 'MOVIE'})
            }
            if(result.media_type === 'person'){
                setPresent({...present, person: 'PERSON'})
            }
        })
        await props.parentCallback(responseData.results);
        await props.showResults(true)
        await props.present(present);
        setIsLoading(false)
        setTimeout(() => {
            props.loading(false)
        })
        
        }
    }
    return (
        <React.Fragment>
            <div className="searchBar">
                <input className="input_search" id="search" search element="input" validators={[REQUIRE()]} placeholder="Search" onChange={inputHandler}/>
                <span onClick={props.onClick} className="showSearch" style={{fontSize: '3rem', marginRight: '1rem', paddingLeft: '1rem'}}><i class="fas fa-times"></i></span>
            </div>
        </React.Fragment>
    )
}

export default SearchBar
