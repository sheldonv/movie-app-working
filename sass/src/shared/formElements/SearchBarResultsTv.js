import React, {useState, useContext} from 'react'
import './SearchBarResults.css';
import {Link} from 'react-router-dom';

import {searchContext} from '../../util/context/search-context';

const SearchBarResultsTv = (props) => {
    const [tvPresent, setTvPresent] = useState(false)

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const search = useContext(searchContext);
    let show = false;
    if(props.results.length > 0){
        
    }
    const linkClicked = () => {
        props.clicked(true)
    }
    const imagesLoaded = []
    return (
        <div className="ready" >
            {props.present && tvPresent && <h2 className="category">TV</h2>}
           
                {props.results.map(result => {
                return (
                    <Link onclick={linkClicked}  className="searchBarResults" to={`/movie/${result.id}`} exact="true">
                <div className="searchBarLink">
                        <div className="searchBarLink__image">
                            <img onLoad={() => { imagesLoaded.push(true) 
                                if(imagesLoaded.length === props.results.length){
                                    search.pingTv();
                                    show = true
                                    setTvPresent(true)
                                    console.log(search.tvReady)
                                }
                            }} src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}/>
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

export default SearchBarResultsTv
