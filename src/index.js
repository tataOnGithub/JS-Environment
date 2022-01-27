// For Button1 
let input1 = document.getElementById('input-id-1');
let button1 = document.getElementById('button-id-1');
let countryWrapper = document.getElementById('country-wrapper');
let years = document.getElementById('years');
let actors = document.getElementById('actors');

// For Button2
let button2 = document.getElementById('button-id-2');
let input2 = document.getElementById('input-id-2');
let input3 = document.getElementById('input-id-3');
let input4 = document.getElementById('input-id-4');
let sectionWrapper = document.getElementById('section2-wrapper');
let moviesLength = document.getElementById('movies-length');
let population = document.getElementById('countries-population');

let num;
let populationAll;

button2.addEventListener('click', function(event) {
    event.preventDefault();
    moviesLength.innerHTML = '';
    population.innerHTML = '';
    let value2 = input2.value;
    let value3 = input3.value;
    let value4 = input4.value;
    input2.value = '';
    input3.value = '';
    input4.value = '';

    lengthOfMovies(value2);
    lengthOfMovies(value3);
    lengthOfMovies(value4);
    setTimeout(() => {moviesLength.innerHTML = `Duration Of All Movies: ${num} mins`}, 500);
    num = 0;
    definePopulation(value2);
    definePopulation(value3);
    definePopulation(value4);
    setTimeout(() => {population.innerHTML = `Population Of All Countries: ${populationAll}`}, 1500);
    populationAll = 0
});   


button1.addEventListener('click', function(event) {
    event.preventDefault();
    countryWrapper.innerHTML = '';
    let value = input1.value;
    input1.value = '';
    getMovieYear(value);
    getMovieActors(value);
    getMovieCountries(value);
});    


function definePopulation(title) {
    getMovie(title).then(movie => {
        let hasCountry = movie.Country;
        let arrayOfCountries = hasCountry.split(', ');
        console.log(arrayOfCountries);
        for (let i=0; i<arrayOfCountries.length; i++) {
            fetch(`https://restcountries.com/v3.1/name/${arrayOfCountries[i]}`).then(res => res.json()).then(country => {
                console.log(country[0].population);
                let pop = country[0].population;
                let newPop = Number(pop);
                console.log(typeof(newPop));
                populationAll += newPop;
            });
        }
    })
}

function lengthOfMovies(title) {
    getMovie(title).then(movie => {
        let lengthStr = movie.Runtime;
        let lengthArr = lengthStr.split(' ');
        lengthArr.pop();
        let lengthNum = Number(lengthArr);
        num += lengthNum;
        console.log(num);
        // moviesLength.innerHTML += `${num}`;
    });
}


function getMovieYear(title) {
    const d = new Date();
    let currentYear = d.getFullYear();
    return getMovie(title).then(movie => {years.innerHTML = `Released: ${currentYear-movie.Year} Years Ago`});
}

function getMovieActors(title) {
    getMovie(title).then(movie => {
        let actorsList = [];
        actorsList.push(movie.Actors);
        let newList = actorsList.join('');
        actorsList = newList.split(', ');
        newList = actorsList.join(' ');
        actorsList = newList.split(' ');
        let finalArr = [];
        for (let i=0; i<actorsList.length; i++) {
            if(i%2==0) {
                finalArr.push(actorsList[i]);
            }
        }
        let finalString = finalArr.join(', ');
        actors.innerHTML = 'Actors: ' + finalString;
    });
}

function getMovie(title) {
    return fetch(`http://www.omdbapi.com/?t=${title}&apikey=3ea72128`).then(res => res.json());
}

function getMovieCountries(title) {
    getMovie(title).then(movie => {
        let isCountry = movie.Country;
        let countriesArray = isCountry.split(', ');
        let flagCountry = '';
        let currency = '';
        let parentDiv = document.createElement('div');
        parentDiv.classList.add('parent-div');
        countryWrapper.appendChild(parentDiv);
        for (let i=0; i<countriesArray.length; i++) {
            fetch(`https://restcountries.com/v3.1/name/${countriesArray[i]}`).then(res => res.json()).then(country => {
                flagCountry = country[0].flags.png;
                currency = country[0].currencies;
                let currencyString = Object.keys(currency)[0];

                let childDiv = document.createElement('div');
                childDiv.classList.add('child-div');
                parentDiv.appendChild(childDiv);

                let movieCountry = document.createElement('p');
                movieCountry.classList.add('movie-country');
                let currencyTag = document.createElement('p');
                currencyTag.classList.add('currency');
                let flagTag = document.createElement('img');
                flagTag.classList.add('flag');
                parentDiv.appendChild(movieCountry);
                parentDiv.appendChild(currencyTag);
                parentDiv.appendChild(flagTag);

                movieCountry.innerHTML = countriesArray[i] + ': ';
                currencyTag.innerHTML = 'Currency: ' + currencyString;
                flagTag.src = flagCountry;
            }).catch(() => console.log("can't find"));
        }
    });
}
