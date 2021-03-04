import React, {useState, useEffect} from 'react'
import Input from '../../shared/formElements/Inputs';
import { useForm } from '../../util/hooks/form-hook';
import { useHttpClient } from '../../util/hooks/http-hook';
import { REQUIRE } from '../../util/validators/validator';
import SelectYear from '../../shared/formElements/SelectYear';
import ActorSearchResults from '../../shared/formElements/ActorSearchResults';
import './Discover.scss';
import MovieList from '../../movies/components/MovieList';
import { addEvent } from '../../util/functions';
const Discover = (props) => {
    const {sendRequest} = useHttpClient();
    const [genres, setGenres] = useState();
    const [genresLoading, setGenresLoading] = useState();
    const [actors, setActors] = useState();
    const [actorsLoading, setActorsLoading] = useState(true);
    const [discovered, setDiscovered] = useState([1,2]);
    const [discoveredLoading, setDiscoveredLoading] = useState(true);
    const [actorId, setActorId] = useState();
    useEffect(async () => {
        setGenresLoading(true);
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/discover/genres`, 'GET', null);
        await setGenres(response.genres)
        console.log(response.genres)
        setGenresLoading(false);
        document.getElementById('name').focus();
        document.getElementById('name').select();
        
    }, [sendRequest])
    const removeActors = async () => {
        const element = await document.getElementById('actor-search')
        console.log(element)
        if(element.style.display == "block"){
            console.log('none')
            element.style.display = "none"
        }else{
            element.style.display = 'block' 
            console.log('block')
        }
        
    } 
    const showActors = () => {
        document.getElementById('actor-search').style.display = "block"
    }
    const hideActors = () => {
        document.getElementById('actor-search').style.display = "none"
    }
    const showOrHide = () => {
        if(document.getElementById('actor-search').style.display == "block"){
            hideActors()
        }else {
            showActors();
        }
    }
    useEffect(() => {
       
        const actorInput = document.getElementById('name');
        actorInput.addEventListener('blur', () => { 
            console.log('blur')
            hideActors();
        console.log('reached')
        });
        actorInput.addEventListener('focus', () => {
            console.log('focus')
            showActors();
        })
        /*addEvent(document.getElementById('name'),'blur',function(e){
            const input = e.target || e.srcElement;
            const element = document.getElementById('actor-search');
            console.log(element)
            const display = getComputedStyle(element).display;
            
                element.style.display = "none";
                console.log(display)
           
        });
        addEvent(document.getElementById('name'),'focus',function(e){
            const input = e.target || e.srcElement;
            const element = document.getElementById('actor-search');
            console.log(element)
            const display = getComputedStyle(element).display;
           
                element.style.display = "block";
                console.log(display)
           
        });*/
      
    }, [])
    
    
    const discover = async (event) => {
        console.log(actorId)
        event.preventDefault();
        setDiscoveredLoading(true);
        let genre = document.getElementById("genre");
        genre = genre.value || null;
        let year = document.getElementById("year");
        year = year.value || null;
        let name = document.getElementById("name");
        name = actorId || null;
        console.log(genre, year, name)
        
        const response = await fetch(`:3000/discover/${name}/${year}/${genre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        
        setDiscovered(responseData.results);
        console.log(responseData.results);
        setDiscoveredLoading(false);
    }
    const findName = async (event) => {
        setActorsLoading(true);
        const name = event.target.value;
        const response = await fetch(`:3000/search/actor/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json();
        console.log(responseData.results)
        setActors(responseData.results)
        console.log(name)
        setActorsLoading(false)
    }
    const alertName = (event) => {
        console.log('reachted')
        console.log(event.currentTarget.id);
        setActorId(event.currentTarget.id);
        console.log(actorId)
    }
    return (
        <React.Fragment>
                <form className="form">
                    {genres && !genresLoading && <div class="custom-select form-element-div">
                        <select  element="dropDown" id="genre" validators={[REQUIRE()]}>
                            {genres.map(genre => {
                                return (
                                <option value={genre.id} >{genre.name}</option>
                                )
                            })}
                        </select>
                    </div>}
                    <div className="form-element-div">
                        <SelectYear  id="year"/>
                    </div>
                        
                    <div className="name-input form-element-div">
                        <input placeholder="Search Actor" type="text" onChange={findName} id="name"/>
                        {<div className="actor-search" id="actor-search">
                        {!actorsLoading && actors.map(actor => {
                            return ( <ActorSearchResults onClick={alertName} name={actor.name} actor_id={actor.id}/>)
                        })}
                        </div>}
                        
                    </div>
                    <div className="form-element-div">
                        <button onClick={discover}>DISCOVER</button>
                    </div>
                    
                </form>
               {discovered && !discoveredLoading && <div className="home-row">
                <h2>RESULTS</h2>
                <MovieList movies={discovered}/>
            </div>}
        </React.Fragment>
        
    )
}

export default Discover
