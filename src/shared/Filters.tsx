import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { AppContext, genereInterface, languageInterface } from '../App';
import _ from 'lodash'

interface filtersPropsInterface {
    languagesState: languageInterface[], 
    generesState: genereInterface[],
    setLanguagesState: Function,
    setGeneresState: Function
}


function Filters(){
    const {languagesState, 
        generesState,
        setLanguagesState,
        setGeneresState
    }: 
    filtersPropsInterface = useContext(AppContext);



    function handleClickLanguage(e: any){        
        let clickedLang = e.target.innerText;
        let languagesStateCopy = _.cloneDeep(languagesState);

        let index = languagesStateCopy.findIndex(el => el.language === clickedLang);
        let status:boolean = languagesState[index].selected
        languagesStateCopy[index].selected = !status
        setLanguagesState(languagesStateCopy)
    }

    function handleClickGenere(e: any){
    let clickedGenere = e.target.innerText;
    let generesStateCopy = _.cloneDeep(generesState);

    let index = generesStateCopy.findIndex(el => el.genere === clickedGenere);
    let status: boolean = generesState[index].selected;
    generesStateCopy[index].selected = !status;
    setGeneresState(generesStateCopy)

    }


    function langClear(){
        let temp: languageInterface[] = languagesState.map(el => {
                let selected = false
                let language = el.language;

                return {language, selected}

        })

        setLanguagesState(temp)
    }

    function genereClear(){
        let temp: genereInterface[] = generesState.map(el => {
            let selected = false;
            let genere = el.genere;
            return {genere, selected}
        })

        setGeneresState(temp)

    }

    return(<>
    {/* 1. Languages filters */}
    {/* 2. Generes filters */}

    <Stack direction="row" spacing={1}
     style={{marginTop: 20, display: 'flex', alignItems: 'center'}}
     >
    {languagesState.map(el => {
        return( <Chip
            style={{
                backgroundColor: el.selected? 'blue': '',
                color: el.selected? 'white': ''
            }}
            label={el.language}
            onClick={handleClickLanguage}
            deleteIcon={<DeleteIcon />}
            variant="outlined"
          />)
    })}
     <p style={{marginLeft: 30, color: 'blue', cursor: 'pointer'}}
     onClick={langClear}
     >clear</p>
    
    </Stack>

    <Stack direction="row" spacing={1} 
    style={{marginTop: 20, display: 'flex', alignItems: 'center'}}
    >
    {generesState.map(el => {
        return( <Chip
            style={{
                backgroundColor: el.selected? 'blue': '',
                color: el.selected? 'white': ''
            }}
            label={el.genere}
            onClick={handleClickGenere}
            deleteIcon={<DeleteIcon />}
            variant="outlined"
          />)
    })}
     <p style={{marginLeft: 30, color: 'blue', cursor: 'pointer'}}
     onClick={genereClear}
     >clear</p>
    </Stack>

    </>)
}

export default Filters;