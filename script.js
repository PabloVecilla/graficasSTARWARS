
// obtener películas de la api star wars  
async function getStarwarsMovies() {
    let response = await fetch("https://swapi.info/api/films"); 
    if (!response.ok) {
        throw new Error("Failed to fetch Star Wars characters");
      } 
    let jsonData = await response.json(); 
    const movies = jsonData.map((pelicula) => {
        return {
            title: pelicula.title, 
            releaseYear: new Date(pelicula.release_date).getFullYear()
        }
    }) 
    return movies; 
}

const createChartData = (movies) => {
    const labels = movies.map(movie => movie.title); 
    const series = movies.map(movie => movie.releaseYear); 
    return {
        labels: labels,
        series: [series]
    }
}

const options = {
    fullWidth: true,
    chartPadding: {
      right: 45,
      left: 20,
      bottom: 20
    },
    axisY: {
        onlyInteger: true
    }
  };

const renderChart = (chartData) => {
    new Chartist.Line('.ct-chart', chartData, options);
}

async function init() {
    try {
        const movies = await getStarwarsMovies(); 
        const chartData = createChartData(movies); 
        renderChart(chartData); 
    } catch (error) {
        console.error("Error loading movies: ", error); 
    }
}

init(); 

// Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver
// En el eje X el nombre del personaje
// En el eje Y el número de películas en las que ha participado.
// API ENDPOINT --> https://swapi.info/api/people

// obtener personajes de la api star wars  
/* async function getMovie(url) {
    let stringData = await fetch(url); 
    let objectData = await stringData.json(); 
    return objectData.title;  
} */

async function getStarwarsCharacters() {
    const response = await fetch("https://swapi.info/api/people?limit=20");
    if (!response.ok) {
        throw new Error("Failed to fetch Star Wars characters");
      } 
    const jsonData = await response.json(); 
    const charactersDataLimitless = jsonData.map((character) => {
        return {
            name: character.name, 
            filmsCount: character.films.length
        }
    }) 
    const charactersData = charactersDataLimitless.filter((character) => character.filmsCount >=3);
    return charactersData; 
}
const createCharactersChartData = (charactersData) => {
    const labels = charactersData.map(character => character.name); 
    const series = charactersData.map(character => character.filmsCount); 
    return {
        labels: labels,
        series: [series]
    }
}

const optionsCharacterChart = {
    axisY: {
        onlyInteger: true, 
        low: 3
    }, 
    chartPadding: {
        right: 20,
        left: 20,
        bottom: 50, 
        top: 20
    }
}

const renderCharactersChart = (chartData) => {
    new Chartist.Bar('.ct-chart1', chartData, optionsCharacterChart);
}

async function initCharactersChart() {
    try {
        const characters = await getStarwarsCharacters(); 
        const chartData = createCharactersChartData(characters); 
        renderCharactersChart(chartData); 
    } catch (error) {
        console.error("Error loading characters: ", error); 
    }
}
initCharactersChart(); 
