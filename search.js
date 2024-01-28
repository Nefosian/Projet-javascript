document.addEventListener('DOMContentLoaded', function () {
    const filmList = document.getElementById('liste_films');
    const nextPageButton = document.getElementById('next_page');
    const lastPageButton = document.getElementById('previous_page');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    let currentPage = 1;

    function fetchData(page, search) {
        document.getElementById('loader').style.display = "block";
        filmList.innerHTML = '';
        let apiUrl = `http://www.omdbapi.com/?page=${page}&apikey=c5ea3601`;

        if (search) {
            apiUrl += `&s=${search}`;
        }
        
        return fetch(apiUrl)
            .then(response => response.json());
    }

    function displayMovies(movies) {
        filmList.innerHTML = '';
    
        if (movies.Search && movies.Search.length > 0) {
            movies.Search.forEach(movie => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('film');
                movieElement.innerHTML = `
                    <img src="${movie.Poster}" alt="Poster cannot be loaded">
                    <h3>${movie.Title}</h3>
                `;
                filmList.appendChild(movieElement);
                nextPageButton.style.visibility = "visible";
                lastPageButton.style.visibility = "visible";
            });
        } else {
            swCharList.innerHTML = `
                <p>Please do a search.</p>
            `;
            nextPageButton.style.visibility = "hidden";
            lastPageButton.style.visibility = "hidden";
        }
    
        document.getElementById('loader').style.display = "none";
    }

    function loadPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, searchInput.value)
                .then(displayMovies);
        } else {
            alert("You are already on the first page, you cannot go back.");
        }
    }


    function loadNextPage() {
        currentPage++;
        fetchData(currentPage, searchInput.value)
            .then(displayMovies);
    }

    function recupSearch() {
        currentPage = 1;
        fetchData(currentPage, searchInput.value)
            .then(displayMovies);
    }

    loadNextPage();

    lastPageButton.addEventListener('click', loadPreviousPage);
    nextPageButton.addEventListener('click', loadNextPage);
    searchButton.addEventListener('click', recupSearch);
});