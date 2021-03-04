import React, {useRef, useCallback} from 'react'
import './MovieList.scss';
import MovieItem from './MovieItem';
import { useHttpClient } from '../../util/hooks/http-hook';

const MovieList = (props) => {
    const {sendRequest} = useHttpClient();
    let count = 2;
    const scrollLeft = useCallback((event) => {
        const current = event.target
        const movieList = current.previousElementSibling;
        const scrolledLeft = movieList.scrollLeft;
        event.preventDefault();
        const scrollOptions = {
            left: scrolledLeft + 1230,
            behavior: 'smooth'
        }
        movieList.scrollTo(scrollOptions)
        
        const elements = document.getElementsByClassName('movie-list');
        console.log(elements)
        let scrolling = false;
        
        var myFunction = async function() {
            const left = Math.ceil(this.scrollLeft);
            const width = this.scrollWidth;
            const client = this.clientWidth;
            console.log([left, width, client]); 
            if((left + client) === width){
               
                await props.count(count);
                console.log("count", count) 
            
                console.log(props.url)
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/movie/home/${props.url}/${count}` , 'GET', null)
                console.log(response.results)
                await props.parentCallback(response.results);
                 count++
            }
            scrolling = false;

            this.scroll = () => {
            scrolling = true;
            };

            setInterval(() => {
                if (scrolling) {
                    scrolling = false;
                    // place the scroll handling logic here
                    console.log('loading')

                }
            }, 300);
        };
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('scroll', myFunction, false);
        }
    }, [])
    const scrollRight = useCallback((event) => {
        const current = event.target;
        console.log(current)
        const movieList = current.nextElementSibling;
        console.log(movieList)
        const width = movieList.scrollWidth
        const scrolledLeft = movieList.scrollLeft;
        const scrolled = width - scrolledLeft;
        event.preventDefault();
            
        const scrollOptions = {
            left: scrolledLeft - 1230,
            behavior: 'smooth'
        }
        movieList.scrollTo(scrollOptions)
        console.log(scrolled)
        const elements = document.getElementsByClassName('movie-list');
        console.log(elements)
        const myFunction = function() {
            const client = this.clientWidth;
            const left = this.scrollLeft;
            const width = this.scrollWidth;
            console.log([left, width, client]) 
            
        };
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', myFunction, false);
        }
    }, [])
    return (
        <React.Fragment>
            
            <div className="movie-row">
            <i onClick={scrollRight}  className="fas fa-chevron-left forward">right</i>
                    
                    <ul id={props.id}  className="movie-list" >
                        {props.movies.map(movie => {
                            return <MovieItem 
                                    image={movie.poster_path}
                                    title={movie.original_title}
                                    id={movie.id}
                                    rating={movie.voter_average}/>
                        })} 
                    </ul>
                    <i onClick={scrollLeft}  className="fas fa-chevron-right back">left</i>
            </div>    
        </React.Fragment>
    )
}

export default MovieList
