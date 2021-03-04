import React, {useState, useEffect, useCallback} from 'react'
import MovieList from '../components/MovieList'
import {useHttpClient} from '../../util/hooks/http-hook';
import Input from '../../shared/formElements/Inputs';
import { REQUIRE } from '../../util/validators/validator';
import './Movies.css';
import Modal from '../../shared/components/Modal';

const Movies = () => {
    const {sendRequest} = useHttpClient();
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [nowPlayingLoading, setNowPlayingLoading] = useState(true);
    const [popularLoading, setPopularLoading] = useState(true);
    const [topRatedLoading, setTopRatedLoading] = useState(true);
    const [upComingLoading, setUpComingLoading] = useState(true);
    const [pageLoading, setIsPageLoading] = useState(true);
    const [nowPlayingCount, setNowPlayingCount] = useState(1);
    const [topRatedCount, setTopRatedCount] = useState(1);
    const [upComingCount, setUpComingCount] = useState(1);
    const [popularCount, setPopularCount] = useState(1);
    useEffect(() => {
        let loading = nowPlayingLoading && popularLoading && topRatedLoading && upComingLoading;
        console.log(pageLoading)
        setIsPageLoading(loading);
    }, [])
    
    

        
    useEffect(async () => {
        setNowPlayingLoading(true);
        const fetchUsers = async () => {
            const response = await sendRequest(`http://localhost:3000/movie/home/now_playing/${nowPlayingCount}`, 'GET', null);
            await setNowPlaying(oldArray => [...oldArray, ...response.results])
            console.log(response.results)
        }
        fetchUsers();
        setNowPlayingLoading(false);
    }, [sendRequest])

    useEffect(async () => {
        setPopularLoading(true);
        const fetchUsers = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movie/home/popular/${popularCount}`, 'GET', null);
            await setPopular(oldArray => [...oldArray, ...response.results])
            console.log(response.results)
        }
        fetchUsers();
        setPopularLoading(false);
    }, [sendRequest])

    useEffect(async () => {
        setTopRatedLoading(true);
        const fetchUsers = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movie/home/top_rated/${topRatedCount}`, 'GET', null);
            await setTopRated(oldArray => [...oldArray, ...response.results])
            console.log(response.results)
        }
        fetchUsers();
        setTopRatedLoading(false);
    }, [sendRequest])

    useEffect(async () => {
        setUpComingLoading(true);
        const fetchUsers = async () => {
            const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movie/home/coming_soon/${upComingCount}`, 'GET', null);
            await setUpComing(oldArray => [...oldArray, ...response.results])
            console.log(response.results);
        }
        fetchUsers();
        setUpComingLoading(false);
    }, [sendRequest])
    
    const setNowPlayingResults = useCallback((childData) => {
        setNowPlaying(oldArray => [...oldArray, ...childData]);
    }, [])
    const setPopularResults = useCallback((childData) => {
        setPopular(oldArray => [...oldArray, ...childData]);
    }, [])
    const setTopRatedResults = useCallback((childData) => {
        setTopRated(oldArray => [...oldArray, ...childData]);
    }, [])
    const setComingSoonResults = useCallback((childData) => {
        setUpComing(oldArray => [...oldArray, ...childData]);
    }, [])
    useEffect(() => {
        
    }, [nowPlaying])
    const setNowPlayingPage = useCallback((childData) => {
        setNowPlayingCount(childData);
    }, [])
    const setPopularPage = useCallback((childData) => {
        setPopularCount(childData);
    }, [])
    const setTopRatedPage = useCallback((childData) => {
        setTopRatedCount(childData);
    }, [])
    const setUpComingPage = useCallback((childData) => {
        setUpComingCount(childData);
    }, [])
    return (
        <React.Fragment>
            {nowPlaying && !nowPlayingLoading &&  <div  className="home-row">
                <h2>NOW PLAYING</h2>
                <MovieList url="now_playing" id="nowPlaying" movies={nowPlaying} count={setNowPlayingPage} parentCallback={setNowPlayingResults}/>
            </div>}
            
            {popular && !popularLoading &&  <div  className="home-row">
                <h2>POPULAR</h2>
                <MovieList url="popular" id="popular" movies={popular} count={setPopularPage} parentCallback={setPopularResults}/>
            </div>}
            
            {topRated && !topRatedLoading &&  <div  className="home-row">
                <h2>TOP RATED</h2>
                <MovieList url="top_rated" id="topRated" movies={topRated} count={setTopRatedPage} parentCallback={setTopRatedResults}/>
            </div>}
            
            {upComing && !upComingLoading && <div  className="home-row">
                <h2>COMING SOON</h2>
                <MovieList url="coming_soon" id="comingSoon" movies={upComing} count={setUpComingPage} parentCallback={setComingSoonResults}/>
            </div>}

        </React.Fragment>
        
    )
}

export default Movies
