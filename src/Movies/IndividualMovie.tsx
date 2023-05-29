import { useContext } from 'react';
import { AppContext} from "../App";
import Header from '../shared/Header';
import {useHistory} from 'react-router'

function IndividualMovie(props: any){

    const history = useHistory();    

    let name = props.match.params.name as any
    const {moviesState} = useContext(AppContext);
    const selectedMovie = moviesState.filter((el: any) => el.movie_name === name)[0];
    console.log(selectedMovie)

    function clickHandler(){
        history.push(`/ticketBooking/${selectedMovie.movie_name}`)
    }

    return(<>
    {/* movie details */}
    {/* Book tickets button - when clicked, if movie is multi language - then open the popup */}
    {/* open popup - PopUpToSelectLanguage.tsx */}
{/* once any option is selected, then movieBookingPage.tsx should open */}
<Header hideSearchBar= {true}/>

{!selectedMovie && <h3> No Data found </h3>}

{!!selectedMovie && <>
    <h2>Movie Details</h2>
<p>Name <b>{selectedMovie.movie_name}</b></p>
<p>Release Date <b>{selectedMovie.release_date}</b></p>
<p>imdb <b>{selectedMovie.imdb_rating}</b></p>
<p>Languages <b>{selectedMovie.language}</b></p>
<p>length <b>{selectedMovie.running_time}</b></p>
<p>Genere <b>{selectedMovie.tags}</b> </p>
<button onClick={clickHandler}>Book Ticket</button>

</>}
    </>)
}

export default IndividualMovie;