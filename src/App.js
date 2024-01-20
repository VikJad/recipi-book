import { useEffect, useState } from 'react';
import './App.css';
import RecipeReviewCard from './components/Recipe';
import PrimarySearchAppBar from './components/SearchRecipe';
import Container from '@mui/material/Container'
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [recepies, setReceipes] = useState([])

  const getRecepies = async (name = null) => {
    let API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    API_URL = (name) ? API_URL + name : API_URL;
    const response = await (await fetch(API_URL)).json();
    setReceipes(response?.meals)

  }

  useEffect(() => {
    getRecepies('');
  }, []);



  return (
    <div>
      <Container fixed>
        <PrimarySearchAppBar handleInput={getRecepies} />
        <Box sx={{ flexGrow: 2 }} marginTop={1}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              {recepies?.map((item, i) => {
                return <Grid item xs={12} md={4} sm={6}> <Item xs={12} sm={12} md={4} key={i}><RecipeReviewCard recipi={item} key={i} /></Item> </Grid>
              })}
            </Grid>

          </Grid>
        </Box>
      </Container>

    </div>
  );
}

export default App;
