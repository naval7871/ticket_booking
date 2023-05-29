import { useContext } from "react";
import { AppContext } from "../App";
import TheatresCard from "./TheatresCard";


function TheatreListsPage(){

    const {theatreState}= useContext(AppContext);
    return(<>
    <h2>Theatres List</h2>
    
    <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>

  {theatreState.map((el: any)=> {
return <TheatresCard theatre={el} />}) 
  }
    </div>



    </>)
}

export default TheatreListsPage;