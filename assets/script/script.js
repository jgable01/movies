/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

  Object-oriented JavaScript
  Joshua Gable

  

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

"use strict";

const urlCities = "./assets/script/cities.json";
const urlMovies = "./assets/script/movies.json";
const dropDown = document.querySelector(".dropdown");
const nav = document.querySelector(".header-nav");
const dropdownNav = document.querySelector(".dropdown-header-nav");
const searchMovie = document.querySelector(".films");
const searchCity = document.querySelector(".city");
const filmsDropdown = document.querySelector(".films-dropdown");
const citiesDropdown = document.querySelector(".city-dropdown");
const inputMovie = document.querySelector(".input-film");
const inputCity = document.querySelector(".input-city");

let movies = [];

dropDown.addEventListener("click", () => {
  dropdownNav.classList.toggle("active");
  console.log("clicked");
});

// Function to get cities from cities.JSON
async function getCities() {
  let response = await fetch(urlCities);
  let data = await response.json();
  return Object.values(data);
}

// Function to get movies from movies.JSON
async function getMovies() {
  let response = await fetch(urlMovies);
  let data = await response.json();
  return Object.values(data);
}

// Function to display cities
async function displayCities() {
  let cities = await getCities();
  cities = Object.values(cities);
  let output = "";
  console.log(cities);
  cities.forEach((city) => {
    cities = city;
  });
  console.log(cities);

  searchCity.addEventListener("keyup", (e) => {
    console.log(cities);
    const searchString = e.target.value.toLowerCase();
    let filteredCities = [];

    if (searchString) {
      filteredCities = cities.filter((city) =>
        city.name.toLowerCase().includes(searchString)
      );
      filteredCities = filteredCities.map(
        (city) => `<li class='city-result'>${city.name}</li>`
      );
    }
    displaySearchResultsCity(filteredCities);
  });
  citiesDropdown.addEventListener("click", (e) => {
    inputCity.value = e.target.innerText;
    console.log(e.target.innerText);
    citiesDropdown.innerHTML = "";
  });
}

// Function to display movies
async function displayMovies() {
  let movies = await getMovies();
  movies = Object.values(movies);
  let output = "";
  console.log(movies);
  movies.forEach((movie) => {
    movies = movie;
  });
  console.log(movies);

  movies.forEach((movie) => {
    output += `
      <div class="movie">
        <h3>${movie.name}</h3>
        <img src="${movie.img}" alt="${movie.name}" />
      </div>
    `;
    console.log(movie.name);
  });
  document.querySelector(".movies").innerHTML = output;

  searchMovie.addEventListener("keyup", (e) => {
    console.log(movies);
    const searchString = e.target.value.toLowerCase();
    let filteredMovies = [];

    if (searchString) {
      filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchString)
      );
      filteredMovies = filteredMovies.map(
        (movie) => `<li class='film-result'>${movie.name}</li>`
      );
    }
    displaySearchResultsMovie(filteredMovies);
  });

  filmsDropdown.addEventListener("click", (e) => {
    inputMovie.value = e.target.innerText;
    console.log(e.target.innerText);
    filmsDropdown.innerHTML = "";
  });
}

// Function to display cities and movies
async function displayCitiesAndMovies() {
  await displayCities();
  await displayMovies();
}

// Function to display cities and movies on page load
displayCitiesAndMovies();

// Function to display search movie results in dropdown
async function displaySearchResultsMovie(filteredArr) {
  const output = !filteredArr.length ? "" : filteredArr.join("");
  filmsDropdown.innerHTML = output;
}

// Function to display search city results in dropdown
async function displaySearchResultsCity(filteredArr) {
  const output = !filteredArr.length ? "" : filteredArr.join("");
  citiesDropdown.innerHTML = output;
}
