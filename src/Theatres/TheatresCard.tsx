import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

function TheatresCard({theatre}: {theatre: any}){
return (<>
  <Card sx={{ width: 250 }}>
      <CardMedia
        component="img"
        height="194"
        image= {theatre.thumbnail_url}
        alt= {theatre.theatre_name}
      />
      <CardContent>
        <b style={{fontSize: 16, whiteSpace: "nowrap", cursor: 'pointer'}}>{theatre.theatre_name}</b>
        <p style={{margin: 3, color: '#777'}}>Customer Rating: {theatre.customer_rating}</p>
      </CardContent> 
      {/* <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions> */}
    </Card>
</>)
}

export default TheatresCard