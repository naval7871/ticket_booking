
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {useHistory} from 'react-router'


export default function MovieCard({movie}: {movie: any}){

const history = useHistory();

  function clickHandler(){
    let movieName = movie.movie_name
    history.push(`/movie/${movieName}`)
  }

    return (<>
    <Card sx={{ width: 250 }}
    style={{cursor: 'pointer'}}
    onClick={clickHandler}
    >
      <CardMedia
        component="img"
        height="194"
        image= {movie.thumbnail_url}
        alt= {movie.movie_name}
      />
      <CardContent>
        <b style={{fontSize: 16, whiteSpace: "nowrap"}}        
        >{movie.movie_name}</b>
        <p style={{margin: 3, color: '#777'}}>imdb: {movie.imdb_rating}</p>
        <p style = {{margin: 3, color: '#777', fontSize: 12, whiteSpace: "nowrap"}}>{movie.language}</p>
        <p style = {{margin: 3, color: '#777', fontSize: 12, whiteSpace: "nowrap"}}>{movie.tags}</p>
      </CardContent> 
      {/* <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}
    </Card>
    </>)
}