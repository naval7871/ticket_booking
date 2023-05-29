import {useState} from 'react'
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import {AppContext, tabValueEnum} from '../App'
import Autocomplete from '@mui/material/Autocomplete';
import {useHistory} from 'react-router'


function SearchComponent(){

    const [searchVal, setSearchVal] = useState('');
    const [suggestions, setSuggestions] = useState([])
    const {moviesState, theatreState, tabValue} = useContext(AppContext)
    const history = useHistory();


    function onSearch(e: any){
        let searchValue = e;
        setSearchVal(searchValue)
        let movieNames = [];
        let theatresName = [];
        if(tabValue === tabValueEnum.MOVIES && !!e.length){
            movieNames = moviesState.map((el: any) => el.movie_name).filter((el: any) => el.toLowerCase().includes(e.toLowerCase()));
            setSuggestions(movieNames)
        }

        else if(tabValue === tabValueEnum.THEATRE && !!e.length){
            theatresName = theatreState.map((el: any) => el.theatre_name).filter((el: any) => el.toLowerCase().includes(e.toLowerCase()))
            setSuggestions(theatresName)
        }
    }


    function onChange(event: any, newValue: string | null){
        tabValue === tabValueEnum.MOVIES && !!newValue?.length && history.push(`/movie/${newValue}`)
    }

    return(<>
    {/* drop down component */}
    {/* search input box */}
    <div>
      {/* <TextField 
       label="Search"
        placeholder= {`search for ${tabValue}`}
        variant="outlined"
        value= {searchVal}
        onChange={onSearch}
        size="small"
        style={{
            width: 500,          
        }}
        /> */}
          {/* <IconButton>
          <SearchIcon/>
        </IconButton> */}

<Autocomplete
  disablePortal
  id="combo-box-demo"
  options={suggestions}
  inputValue={searchVal}
  onInputChange={(event, newInputValue) => {
    onSearch(newInputValue);
  }}
  onChange={onChange}
  sx={{ width: 500 }}
  placeholder= {`search for ${tabValue}`}
  size='small'
  renderInput={(params) => <TextField {...params} 
  label={`${tabValue}`} />}
/>

    </div>

    </>)
}

export default SearchComponent;