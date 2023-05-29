import SearchComponent from "./SearchComponent";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useContext } from 'react';
import { AppContext, tabValueEnum } from "../App";
import {useHistory} from 'react-router'


function Header({hideSearchBar= false}: {hideSearchBar?: boolean}){
  const history = useHistory();

  const {tabValue, setTabValue} = useContext(AppContext)

  function changeTab(event: React.SyntheticEvent, newValue: number){
    setTabValue(newValue)
  }

    return(<>
    <Toolbar 
    // sx={{ borderBottom: 1, borderColor: 'divider' }}
    style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',     

    }}
    >
        <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <Button size="small"
        onClick={()=> history.push('/')}
        >Logo</Button>
        {!hideSearchBar && 
        <SearchComponent />                
        }
        </div>
        <PersonIcon  style={{ marginRight: 50}}/>
      </Toolbar>

      {!hideSearchBar && 
      <Tabs 
      value={tabValue} 
      onChange={changeTab} 
      aria-label="basic tabs example"    
      >
          <Tab label= {tabValueEnum.MOVIES} value = {tabValueEnum.MOVIES} />
          <Tab label={tabValueEnum.THEATRE}  value = {tabValueEnum.THEATRE} />
        </Tabs>
      
      }
    </>)
}

export default Header;