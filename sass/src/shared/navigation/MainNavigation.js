import React, {useState, useCallback} from 'react'
import './MainNavigation.css'
import MainHeader from './MainHeader';
import SearchBar from '../formElements/SearchBar';
import SearchBarResultsMovies from '../formElements/SearchBarResultsMovies';
import SearchBarResultsTv from '../formElements/SearchBarResultsTv';
import SearchBarResultsPerson from '../formElements/SearchBarResultsPerson';

import SideDrawer from './SideDrawer'
import {Link} from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import NavLinks from '../navigation/NavLinks'
import {AuthContext} from '../../util/context/auth-context';
import {useContext} from 'react';

import {searchContext} from '../../util/context/search-context';
import {CSSTransition} from 'react-transition-group';

const MainNavigation = (props) => {
    const auth = useContext(AuthContext);
    const [showSearch, setShowSearch] = useState(false);
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [loadingResults, setLoadingResults] = useState();
    const [showDrawer, setShowDrawer] = useState();
    const [moviePresent, setMoviePresent] = useState(false);
    const [tvPresent, setTvPresent] = useState(false);
    const [personPresent, setPersonPresent] = useState(false);
    const [present, setPresent] = useState({
        movie: null,
        tv: null,
        person: null
    })
    const movie = [];
    const tv = [];
    const person = [];
    const [movies, setMovies ] = useState()
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    const [tvReady, setTvReady] = useState(false);
    const [movieReady, setMovieReady] = useState(false);
    const [personReady, setPersonReady] = useState(false);
    const search = useContext(searchContext);
    const [ready, setReady] = useState();
    const openSearch = () => {
        setShowSearch(true)
        
    }
    const closeSearch = () => {
        setShowSearch(false)
        setShowResults(false)
    }
    const callbackFunction = (childData) => {
        setResults(childData)
    }
    const openResults = (data) => {
        setShowResults(data);
    }
    const closeResults = () => {
        setShowResults(false)
    }
    const closeDrawer = () => {
        setShowDrawer(false)
    }
    const openDrawer = () => {
        setShowDrawer(true)
    }
    const printUser = (event) => {
        event.preventDefault();
        console.log(auth.userId)
    }
    const clicked = (data) => {
        setShowSearch(false)
        console.log(data)
    }
    const presentHandler = (childata) => {
        setPresent(childata);
        console.log(present)  
    }
    const setMovieCallback = useCallback((data) => {
        setMoviePresent(data)
    }, [])
    const loadSpinner = (data) => {
       
    }
    const imageLoaded = (data) => {
        setLoading(false)
    }
    const tvImages = (data) => {
        setTvReady(data)
    }
    const personImages = (data) => {
        setPersonReady(data)
    }
    const movieImages = (data) => {
        setMovieReady(true)
    }
    
    return (
        <React.Fragment>
            {showDrawer && <Backdrop onClick={closeDrawer}/>}
            {<SideDrawer  onClick={closeDrawer} show={showDrawer}>
                <NavLinks className="side-drawer__nav"/>
            </SideDrawer>}
            <MainHeader className="main-header-nav">
                {!showSearch && <div className="nav-left">
                    <button onClick={openDrawer} className="main-header-nav__button">
                        <span />
                        <span />
                        <span />
                    </button>
                    <h1 className="main-header-nav__title"><Link to="/">CINEMA_DL</Link></h1>
                </div>}
                {!showSearch && !auth.isLoggedIn &&<div onClick={openSearch} className="nav-right">
                    <span style={{fontSize: '2rem', marginRight: '3rem'}}>
                        <i className="fas fa-search"></i>
                    </span>
                    <h2>Sign in</h2>
                </div>}
                {auth.isLoggedIn && <button onClick={auth.logout}>LOGOUT</button>}
                {showSearch && <SearchBar loading={loadSpinner}  results onClick={closeSearch} present={presentHandler} showResults={openResults} parentCallback={callbackFunction}/>}
            </MainHeader>
            
           
           
               <React.Fragment>
                  {showResults && <div onClick={closeResults} className="resultsHolder">
                
                {results.filter(result => {
                    return result.media_type === 'movie';
                }).slice(0, 5).map(result => {
                    if(result.media_type === 'movie'){
                       movie.push(result)
                       console.log(movie)
                    }    
                })}
                
                {movie.length > 0 && <SearchBarResultsMovies moviePresent movieReady moviesImages={movieImages} clicked={clicked} present={movie.length > 0} results={movie}/>}
              
                {results.filter(result => {
                    return result.media_type === 'tv';
                }).slice(0, 5).map(result => {
                    if(result.media_type === 'tv'){
                       tv.push(result)
                       console.log(tv)
                    }    
                })}
                {tv.length > 0 && <SearchBarResultsTv tvImages={tvImages} present={tv.length > 0} results={tv}/>}
              
                {results.filter(result => {
                    return result.media_type === 'person';
                }).slice(0, 5).map(result => {
                    if(result.media_type === 'person' && result.profile_path){
                       person.push(result)
                       console.log(person)
                    }    
                })}
                {movie.length > 0 && <SearchBarResultsPerson peopleImages={personImages} imageLoaded={imageLoaded} present={person.length > 0} results={person}/>}
              
                
            </div>} 
               </React.Fragment>
               
           
          
        </React.Fragment>
    )
}

export default MainNavigation
