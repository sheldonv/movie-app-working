import {useEffect, createContext} from 'react';

export const searchContext = createContext({
    tvReady: false,
    movieReady: false,
    peopleReady: false,
    pingMovie: () => {

    },
    pingTv: () => {

    },
    pingPeople: () => {

    }
})

