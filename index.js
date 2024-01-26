document.addEventListener('DOMContentLoaded', function () {
    const movieElement = document.getElementById('poster1');
    let currentPage = 1;

    function fetchData(search) {
        swCharList.innerHTML = '';
        let apiUrl = `http://www.omdbapi.com/?i=tt9218128`;
        
        if (search) {
            apiUrl += `&s=${search}`;
        }
        
        return fetch(apiUrl)
            .then(response => response.json());
    }

    function displayMovies(movies) {
        swCharList.innerHTML = '';
        if (movies.Search) {
            movies.Search.forEach(movie => {
                if (movie.Poster === "N/A"){
                    movieElement.innerHTML = `
                    <p>L'image ne peux pas être charger</p>
                    <h3>${movie.Title}</h3>
                `;
                } else {
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <h3>${movie.Title}</h3>
                `;
                }
                swCharList.appendChild(movieElement);
                nextPageButton.style.visibility = "visible";
                lastPageButton.style.visibility = "visible";
            })
        } else {
            swCharList.innerHTML = `
            <p>Aucun résultat</p>
            `;
            nextPageButton.style.visibility = "hidden";
            lastPageButton.style.visibility = "hidden";
        }
        document.getElementById('loader').style.display = "none";
    }

    displayMovies(fetchData(currentPage));

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
    searchButton.addEventListener('click', recupSearch);
});