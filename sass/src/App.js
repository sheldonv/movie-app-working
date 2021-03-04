import logo from './logo.svg';
import './App.scss';
import React, {useEffect, useState, useCallback, Suspense} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
//import Movies from './movies/pages/Movies';
//import MoviePage from './movies/components/MoviePage';
import MainNavigation from './shared/navigation/MainNavigation';
//import Discover from './movies/pages/Discover';
//import ActorPage from './movies/components/ActorPage'
//import SignUp from './movies/pages/SignUp'
//import Login from './movies/pages/Login'
import {AuthContext} from './util/context/auth-context';
import {useContext} from 'react';
import {searchContext} from './util/context/search-context';
//import Profile from './movies/pages/Profile'

const Movies = React.lazy(() => import('./movies/pages/Movies'))
const MoviePage = React.lazy(() => import('./movies/components/MoviePage'))
const Discover = React.lazy(() => import('./movies/pages/Discover'))
const ActorPage = React.lazy(() => import('./movies/components/ActorPage'))
const SignUp = React.lazy(() => import('./movies/pages/Login'))
const Login = React.lazy(() => import('./movies/pages/Login'))
const Profile = React.lazy(() => import('./movies/pages/Profile'))

function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [movieReady, setMovieReady] = useState();
  const [tvReady, setTvReady] = useState();
  const [peopleReady, setPeopleReady] = useState();
  const [expirationDate, setExpirationDate] = useState();

  const auth = useContext(AuthContext)
  const search = useContext(searchContext);
  let timer;
  const login = useCallback((userId, userName, token, expirationDate) => {
    setToken(token);
    console.log(userId)
    setUserId(userId)
    setUserName(userName)
    const expiration  = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
    setExpirationDate(expiration)
    localStorage.setItem('userData', JSON.stringify({userId: userId, userName:userName, token: token, expirationDate: expiration.toISOString()}))
  },[])
  
  const logout = () => {
      setToken(null)
      setUserId(null)
      setUserName(null)
      setExpirationDate(null)
      localStorage.removeItem('userData')
    }
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(userData && userData.token && new Date(userData.expirationDate) > new Date()){
      login(userData.id, userData.name, userData.token, userData.expirationDate)
    }
  }, [login]);

  useEffect(() => {
    if (token && expirationDate) {
      const timeRemaining = expirationDate.getTime() - new Date().getTime();
      timer = setTimeout(() => {
        logout()
      }, timeRemaining)
    }else{
      clearTimeout(timer)
    }
  }, [expirationDate, token, logout])
  
  
  const pingMovie = useCallback(() => {
    setMovieReady(true)
  })
  const pingTv = useCallback(() => {
    setTvReady(true);
  })
  const pingPeople = useCallback(() => {
    setPeopleReady(true);
  })
  let routes;
  if(token){
      routes = (
        <Switch>
          <Route path="/" exact>
          <Movies />
        </Route>
        <Route path="/movie/:movie_id" exact>
          <MoviePage />
        </Route>
        <Route path="/discover" exact>
          <Discover />
        </Route>
        <Route path="/actor/:actor_id" exact>
          <ActorPage/>
        </Route>
        <Route path="/update/:profileId">
          <SignUp />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Redirect to="/"/>
        </Switch>
      )
  }else{
    routes = (
      <Switch>
        <Route path="/" exact>
          <Movies />
        </Route>
        <Route path="/movie/:movie_id" exact>
          <MoviePage />
        </Route>
        <Route path="/discover" exact>
          <Discover />
        </Route>
        <Route path="/actor/:actor_id" exact>
          <ActorPage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/"/>
        </Switch>
    )
  }
  return (
    <searchContext.Provider value={{pingMovie: pingMovie, pingTv: pingTv, pingPeople: pingPeople, tvReady: tvReady, movieReady: movieReady, peopleReady: peopleReady}}>
      <AuthContext.Provider value={{login: login, logout: logout, token: token, isLoggedIn: token, userId: userId, userName: userName}}>
            <Router>
            <MainNavigation />
            <main className="main">
              <Suspense fallback={<div></div>}>
                {routes}
              </Suspense>
              
            </main>
            
          </Router>
      </AuthContext.Provider>
    </searchContext.Provider>
    
    
  );
}

export default App;
