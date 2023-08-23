import Header from './shared/Header';
import Movies from './Movies/Movies';
import { useContext } from 'react';
import { AppContext, tabValueEnum } from './App';
import TheatreListsPage from './Theatres/TheatresListsPage';

function Home(){
    console.log('Home2')
    const {tabValue} = useContext(AppContext)

return(<>

{/* 1. Header component - logo, search component */}
{/* 2. Filter component - left side */}
{/* 3. Movies component - right side */}

<Header/>
{
tabValue === tabValueEnum.MOVIES && <Movies />
}

{tabValue === tabValueEnum.THEATRE && <TheatreListsPage />}

</>)

}

export default Home;