import { useContext } from "react";
import { AppContext, genereInterface, languageInterface } from "../App";
import MovieCard from "./MovieCard";
import Filters from "../shared/Filters";
import _ from 'lodash'



function filtersMovieListFun(movieList: any, selectedLangFilters: languageInterface[], 
  selectedGenereFilters: genereInterface[]){

    let filteredMovies = _.cloneDeep(movieList)

    if(selectedLangFilters.length){
      filteredMovies=  movieList.filter((el: any) => {
         let isIncluded = false;
         isIncluded = selectedLangFilters.some(ele => {
           return el.language.includes(ele.language)
        })
       
       
        return isIncluded? el: null
       })

    }

    if(selectedGenereFilters.length){
       let temp = selectedLangFilters.length? filteredMovies: movieList;
      filteredMovies= temp.filter((el: any) => {
        let isIncluded = false;
        isIncluded = selectedGenereFilters.some(ele => {
          return el.tags.includes(ele.genere)
       })
      
      
       return isIncluded? el: null
      })
    }

   return filteredMovies


}



function MoviesList(){
const {recommendedMovies, moviesState, languagesState, generesState}: 
{recommendedMovies: any[], 
moviesState: any[], 
languagesState: languageInterface[],
generesState: genereInterface[]
} = useContext(AppContext);
console.log(recommendedMovies)

let selectedLangFilters = languagesState.filter((el) => !!el.selected)
let selectedGenereFilters = generesState.filter((el) => !!el.selected);


let recommendedMoviesToDisplay = 
(!selectedGenereFilters.length && !selectedLangFilters.length)? recommendedMovies:
filtersMovieListFun(recommendedMovies, selectedLangFilters, selectedGenereFilters)


let allMoviesToDisplay = 
(!selectedGenereFilters.length && !selectedLangFilters.length)? moviesState:
filtersMovieListFun(moviesState, selectedLangFilters, selectedGenereFilters)

    return(<>
    <Filters />
    {/* show top 10 movies based on IMDB in carousel form */}
    <h2>
        Recommended Movies
    </h2>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 15}}>
  {recommendedMoviesToDisplay.map((el: any) => {
    return <div key= {el.movie_name}>
    <MovieCard movie = {el} />        
    </div>
  })}
    </div>

  <h2>All Movies</h2>
  <div style={{display: 'flex', flexWrap: 'wrap', gap: 15}}>
  {allMoviesToDisplay.map((el: any) => <div key= {el.movie_name}>
    <MovieCard movie = {el} />
</div>
  )}

  </div>
    </>)
}

export default MoviesList;