const searchForm = document.querySelector(".search-bar");
const searchButton = document.getElementById("search-button");
const searchButtonMore = document.getElementById("search-button-more");
const searchBar = document.getElementById("bar");
const results = document.querySelector(".results-container");

/* Global Constants */
const GIF_PATH = "https://api.giphy.com/v1/gifs/search?api_key=";
const API_KEY = "IUTBCjqxjk4xDitu2CniSUgC3pzkVx3J";
const LIMIT = 9;
const RATING = "g";

//search term
var searchTerm = "";
var currentIndex = 0;

async function getResults(searchTerm) {
    const offset = currentIndex * LIMIT;
    const response = await fetch(GIF_PATH+API_KEY+`&q=${searchTerm}&limit=`+LIMIT+`&offset=${offset}&rating=`+RATING+"&lang=en");
    const results = await response.json();
    //console.log(results.data);
    console.log(GIF_PATH+API_KEY+`&q=${searchTerm}&limit=`+LIMIT+"&offset=0&rating="+RATING+"&lang=en");
    return results.data;
}

function displayResults(data) {
    data.forEach(function (gif) {
        var gifImage = gif.images.original.url;
        results.innerHTML += `
            <div class="gif">
                <img src="${gifImage}" />
            </div>
        `
    });

}

async function handleFormSubmit(event) {
    //prevent form from redirecting the page
    event.preventDefault();
    //clear the results page 
    results.innerHTML = "";
    //get search term value
    searchTerm = searchBar.value;
    const response = await getResults(searchTerm);
    //console.log(searchTerm);
    //display the results of the response data
    displayResults(response);
    //clear the search bar text
    searchBar.value = '';
    currentIndex++;
    //reveal the more button
    searchButtonMore.classList.remove("hidden");

}

async function handleMoreClicks(event) {
    event.preventDefault();
    const response = await getResults(searchTerm);
    displayResults(response);
    currentIndex++;

}
//submit event fires on the <form> element itself and not on any <button> or <input type="submit">
searchForm.addEventListener("submit", handleFormSubmit);
//more results
searchButtonMore.addEventListener("click",handleMoreClicks);