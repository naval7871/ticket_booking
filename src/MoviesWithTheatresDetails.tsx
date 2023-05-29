import { useContext } from 'react';
import { AppContext } from './App';
import Header from './shared/Header';


function MoviesWithTheatresDetails(props: any){
    let name = props.match.params.name as any
    const {moviesState, theatreState} = useContext(AppContext);

    const selectedMovie = moviesState.filter((el: any) => el.movie_name === name)[0];
    const theatresWithTheSelectedMovie: any[] = []
    theatreState.forEach((el: any) => {

        let retunableObj: any = {
            address: el.address,
            customer_rating: el.customer_rating,
            theatre_name: el.theatre_name,
            thumbnail_url: el.thumbnail_url,
            website: el.website
        }

        let selectedMovieName = selectedMovie.movie_name;

        const {show1_movie, show2_movie, show3_movie, show4_movie,
            show1_time, show2_time, show3_time, show4_time
        } = el;

        if(selectedMovieName === show1_movie) retunableObj = {...retunableObj, show1_movie: show1_movie, show1_time: show1_time}
        if(selectedMovieName === show2_movie) retunableObj = {...retunableObj, show2_movie: show2_movie, show2_time: show2_time}
        if(selectedMovieName === show3_movie) retunableObj = {...retunableObj, show3_movie: show3_movie, show3_time: show3_time}
        if(selectedMovieName === show4_movie) retunableObj = {...retunableObj, show4_movie: show4_movie, show4_time: show4_time}

         if(retunableObj.hasOwnProperty('show1_movie') ||
        retunableObj.hasOwnProperty('show2_movie') ||
        retunableObj.hasOwnProperty('show3_movie') ||
        retunableObj.hasOwnProperty('show4_movie') 
        ){
            theatresWithTheSelectedMovie.push(retunableObj)
        }

    })
console.log(theatresWithTheSelectedMovie)

function openLink(link: string){
window.open(link, '_blank')
}


return(<>
<Header hideSearchBar= {true}/>
<h4>{selectedMovie.movie_name}</h4>

{/* Theatre details */}

{!!theatresWithTheSelectedMovie.length && theatresWithTheSelectedMovie.map(el => {
    return(<div style={{backgroundColor: '#e1f0f1', padding: 15, marginBottom: 15}}>
        <p><b>Theatre Name: </b> {el.theatre_name}</p>
        {el.show1_time? <p><b>First Show:</b> {el.show1_time}</p>: null}
        {el.show2_time? <p><b>Matinee Show:</b> {el.show2_time}</p>: null}
        {el.show3_time? <p><b>Second Show: </b> {el.show3_time}</p>: null}
        {el.show4_time? <p><b>Night Show:</b> {el.show4_time}</p>: null}
        {<p><b>Address: </b>{el.address}</p>}
        <p><b>Website link: </b><span onClick={()=>openLink(el.website)} style={{color: 'blue', cursor: 'pointer'}}>{el.website}</span></p>        
    </div>)
})}

</>)
}

export default MoviesWithTheatresDetails