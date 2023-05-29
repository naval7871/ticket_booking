import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import { getDetails } from './Services/services';
import Home from './Home';
import { createContext } from 'react';
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndividualMovie from './Movies/IndividualMovie';
import IndividualTheatre from './Theatres/IndividualTheatre';
import MoviesWithTheatresDetails from './MoviesWithTheatresDetails';


export const AppContext = createContext(null as any);

export enum tabValueEnum {
  MOVIES = 'Movies',
  THEATRE = 'Theatre'
}

export interface genereInterface {
  genere: string, selected: boolean
}

export interface languageInterface {
  language: string, selected: boolean
}


function App() {

const [moviesState, setMoviesState] = useState([]);
const [theatreState, setThreatreState] = useState([]);
const [recommendedMovies, setRecommendedMovies] = useState<any[]>([])
const [tabValue, setTabValue] = useState(tabValueEnum.MOVIES);
const [languagesState, setLanguagesState] = useState<languageInterface[]>([]);
const [generesState, setGeneresState] = useState<genereInterface[]>([])

const [loading, setLoading] = useState(true)


  // make api call here

useEffect(()=> {
  const emailAddress = 'navalsunar@gmail.com'
  const response = getDetails(emailAddress);
  response.then(res => {
    const {movies, theatre} = res.data;
    console.log(theatre)

    // correcting the languages data in movies state as from BE, we are
    // not getting the languages data in a proper way.

    movies[5].language = 'Hindi, Tamil, English' // for the Nambi effect
    movies[7].language = 'Tamil, Hindi, Telugu, Kannada, Malayalam' // for vikram
    movies[9].language = 'Kannada, Hindi'; // kahsmir files
    movies[11].language = 'Telugu, Hindi, Tamil, Kannada, Malayalam' // Pushpa
    movies[12].language = 'Tamil, Kannada, Malayalam, Telugu, Hindi' //God Father
    movies[13].language = 'Tamil, Telugu' // Nitham Oru Vaanam

    let arrLanguages = movies.map((el: any) => el.language)
    let languages: string[] = []
    arrLanguages.forEach((el: any) => {
    if(el.includes(',')){
        let subArr = el.trim().split(',')
        subArr = subArr.map((ele: string) => ele.trim())
        languages.push(subArr)
    }
    else {
    languages.push(el.trim())
    }
    
})

let uniqueLanguages: string[] = _.uniq(languages.flat())
setLanguagesState(uniqueLanguages.map(el => ({language: el, selected: false})))

////////////////////////////// generesState ////////////////////////

let generesArr = movies.map((el: any) => el.tags);
let geners: string[] = [];

generesArr.forEach((el: any) => {
  if(el.includes(',')){
    let subArr = el.trim().split(',')
    subArr = subArr.map((ele: string) => ele.trim())
    geners.push(subArr)
}
else
  geners.push(el.trim());
})


let uniqueGeneres: string[] = _.uniq(geners.flat())
setGeneresState(uniqueGeneres.map(el => ({genere: el, selected: false})))


////////////////////////////////////////////////////////////////

    let recommendedMovies: any[] = [];
    setMoviesState(movies);
    setThreatreState(theatre)
    setLoading(false);

    recommendedMovies = _.sortBy(movies, (o: any) => o.imdb_rating).reverse().splice(0,10)
    setRecommendedMovies(recommendedMovies)
  })
  .catch(e => console.log(e));
}, [])


  return (
    
    <BrowserRouter>
    
    <Container maxWidth="lg" style={{    
    }}>
  {loading && <>Fetching the data</>}
  {!loading && <AppContext.Provider
  value = {{
    moviesState: moviesState,
    theatreState: theatreState,    
    tabValue: tabValue,
    setTabValue: setTabValue,
    recommendedMovies: recommendedMovies,
    languagesState: languagesState,
    generesState: generesState,
    setLanguagesState: setLanguagesState,
    setGeneresState: setGeneresState
  }}
  >
<Switch>
  <Route exact path = {'/'} component = {Home}/>
  <Route path = {'/movie/:name'} component = {IndividualMovie}/>
  <Route path = {'/theatre/:name'} component = {IndividualTheatre}/>
  <Route path = {'/ticketBooking/:name'} component = {MoviesWithTheatresDetails}/>

</Switch>
  </AppContext.Provider>
  }
    </Container>
    </BrowserRouter>

  );
}

export default App;
