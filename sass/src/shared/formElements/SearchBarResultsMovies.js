import React, { useState, useContext } from 'react'
import './SearchBarResults.css';
import { Link } from 'react-router-dom';

import { searchContext } from '../../util/context/search-context';

const SearchBarResultsMovies = (props) => {
    const [moviePresent, setMoviePresent] = useState(false)
    const [imagesReady, setImagesReady] = useState(false)
    const search = useContext(searchContext);

    if (props.results.length > 0) {

    }
    const clicked = () => {
        props.clicked(true)
    }
    const imagesLoaded = []
    const ready = false;
    let show = false;
    return (
        <React.Fragment>

            <div className="ready" >
                {props.present && moviePresent && <h2 className="category">MOVIE</h2>}
                {props.results.map(result => {
                    return (
                        <Link className="searchBarResults" to={`/movie/${result.id}`} exact="true">
                            <div onClick={clicked} className="searchBarLink">
                                <div className="searchBarLink__image">
                                    <img onLoad={() => {
                                        imagesLoaded.push(true)
                                        if (imagesLoaded.length === props.results.length) {
                                            search.pingMovie()
                                            show = true
                                            console.log(search.movieReady)
                                            setMoviePresent(true)

                                        }

                                    }} src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} />
                                </div>
                                <h2>
                                    {result.title}
                                </h2>
                            </div>

                        </Link>
                    )

                })}
            </div>
        </React.Fragment>


    )
}

export default SearchBarResultsMovies
