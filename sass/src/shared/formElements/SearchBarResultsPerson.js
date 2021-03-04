import React, {useState, useContext} from 'react'
import './SearchBarResults.css';
import {Link} from 'react-router-dom';

import {searchContext} from '../../util/context/search-context';

const SearchBarResultsPerson = (props) => {
    const [personPresent, setPersonPresent] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const search = useContext(searchContext);
    let show = false;
    if(props.results.length > 0){
        
    }
    const imagesLoaded = []
    return (
        <div className="ready" >
            {props.present && personPresent && <h2 className="category">PEOPLE</h2>}
            {props.results.map(result => {
                return (
                    <Link className="searchBarResults" to={`/actor/${result.id}`} exact="true">
                <div className="searchBarLink" >
                        <div className="searchBarLink__image">
                            <img onLoad={() => { imagesLoaded.push(true) 
                                if(imagesLoaded.length === props.results.length){
                                    search.pingPeople();
                                    console.log(search.peopleReady)
                                    show = true
                                    setPersonPresent(true)
                                }
                            }} src={`https://image.tmdb.org/t/p/original/${result.profile_path}`}/>
                        </div>
                        <h2>
                            {result.name}
                        </h2>
                    </div>  
        </Link>
                )
                
            })}
        </div>
       
    )
}

export default SearchBarResultsPerson
